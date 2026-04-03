import nodemailer from 'nodemailer';
import type SMTPPool from 'nodemailer/lib/smtp-pool';
import { Resend } from 'resend';

let cachedTransporter: nodemailer.Transporter<SMTPPool.SentMessageInfo> | null = null;

function hasResendConfigured() {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export function isEmailConfigured() {
  const hasFromIdentity = Boolean(
    process.env.MAIL_FROM?.trim() || process.env.SMTP_USER?.trim()
  );

  return (
    (hasResendConfigured() && hasFromIdentity) ||
    Boolean(process.env.SMTP_USER && process.env.SMTP_PASS)
  );
}

function getSmtpCredentials() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS
    ?.trim()
    .replace(/\s+/g, '')
    .replace(/['"]/g, '');

  if (!user || !pass) {
    throw new Error('Missing SMTP configuration (SMTP_USER/SMTP_PASS)');
  }

  return { user, pass };
}

export function getSmtpTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const { user, pass } = getSmtpCredentials();
  const debug = process.env.SMTP_DEBUG === '1';

  cachedTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },

    // Avoid long-hanging SMTP calls on serverless.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,

    // Reuse one connection per warm lambda to reduce churn.
    pool: true,
    maxConnections: 1,
    maxMessages: 20,
    rateDelta: 1000,
    rateLimit: 2,

    logger: debug,
    debug,
  }) as nodemailer.Transporter<SMTPPool.SentMessageInfo>;

  return cachedTransporter;
}

type EmailAddressLike =
  | string
  | { name?: string; address: string }
  | Array<string | { name?: string; address: string }>;

function normalizeTo(to: EmailAddressLike | undefined): string[] {
  if (!to) return [];

  const toList = Array.isArray(to) ? to : [to];
  const expanded = toList.flatMap((item) => {
    if (typeof item === 'string') {
      // Nodemailer allows comma-separated recipient strings.
      return item
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }

    if (item && typeof item === 'object' && typeof item.address === 'string') {
      return [item.address.trim()].filter(Boolean);
    }

    return [];
  });

  // De-dupe while preserving order.
  return [...new Set(expanded)];
}

function normalizeFrom(from: unknown): string {
  const configured = process.env.MAIL_FROM?.trim();
  if (configured) return configured;

  if (typeof from === 'string' && from.trim()) return from.trim();

  const smtpUser = process.env.SMTP_USER?.trim();
  return smtpUser || '';
}

type TraceParams = {
  traceId: string;
  label: string;
  requestStartMs?: number;
};

function getErrorMeta(err: unknown) {
  if (err && typeof err === 'object') {
    const e = err as {
      code?: unknown;
      responseCode?: unknown;
      response?: unknown;
      command?: unknown;
      message?: unknown;
    };

    return {
      code: typeof e.code === 'string' ? e.code : undefined,
      responseCode: typeof e.responseCode === 'number' ? e.responseCode : undefined,
      response: typeof e.response === 'string' ? e.response : undefined,
      command: typeof e.command === 'string' ? e.command : undefined,
      message: typeof e.message === 'string' ? e.message : undefined,
    };
  }

  return {
    message: typeof err === 'string' ? err : undefined,
  };
}

export async function sendMailTraced(
  params: TraceParams,
  mail: nodemailer.SendMailOptions
) {
  const t2 = Date.now();

  console.info('email.send_start', {
    traceId: params.traceId,
    label: params.label,
    t2,
    delta_ms: params.requestStartMs ? t2 - params.requestStartMs : undefined,
  });

  try {
    if (hasResendConfigured()) {
      const resend = new Resend(process.env.RESEND_API_KEY as string);
      const to = normalizeTo(mail.to as unknown as EmailAddressLike);
      const from = normalizeFrom(mail.from);

      if (!from) {
        throw new Error('Missing MAIL_FROM (or SMTP_USER) for Resend');
      }

      const subject = typeof mail.subject === 'string' ? mail.subject : '';
      const html = typeof mail.html === 'string' ? mail.html : undefined;
      const text = typeof mail.text === 'string' ? mail.text : undefined;

      if (!html && !text) {
        throw new Error('Resend requires either html or text content');
      }

      const result = html
        ? await resend.emails.send({
            from,
            to,
            subject,
            html,
            ...(text ? { text } : {}),
          })
        : await resend.emails.send({
            from,
            to,
            subject,
            text: text as string,
          });

      if (result.error) {
        throw new Error(result.error.message);
      }

      const t3 = Date.now();

      console.info('email.send_ok', {
        traceId: params.traceId,
        label: params.label,
        t3,
        send_ms: t3 - t2,
        messageId: result.data?.id,
        response: 'resend.ok',
        accepted: to,
        rejected: [],
      });

      return result;
    }

    const transporter = getSmtpTransporter();
    const info = await transporter.sendMail(mail);
    const t3 = Date.now();

    console.info('email.send_ok', {
      traceId: params.traceId,
      label: params.label,
      t3,
      send_ms: t3 - t2,
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected,
    });

    return info;
  } catch (err: unknown) {
    const t3 = Date.now();
    const meta = getErrorMeta(err);

    console.error('email.send_err', {
      traceId: params.traceId,
      label: params.label,
      t3,
      send_ms: t3 - t2,
      ...meta,
    });

    throw err;
  }
}
