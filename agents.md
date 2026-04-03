# Agents

## Overview

This document describes the AI agent architecture used for development and automation in the Drive Point Exchange project.

## Development Agents

### Specialized Agents

| Agent | Model | Purpose |
|-------|-------|---------|
| **code-reviewer** | Sonnet | Code quality review — patterns, simplification, severity-tiered findings |
| **security-reviewer** | Sonnet | OWASP top 10, credential exposure, dependency vulnerability analysis |
| **architect** | Opus | System design, API contracts, Architecture Decision Records (ADRs) |
| **tdd-guide** | Sonnet | Test-driven development — RED → GREEN → REFACTOR cycle enforcement |

### Explore Agents

Lightweight agents (Haiku) used for fast, read-only codebase research:

- **Quick** — Basic file/keyword search
- **Medium** — Moderate exploration across related files
- **Very thorough** — Comprehensive cross-codebase analysis

### General-Purpose Agents

Full-capability agents that inherit the parent model. Used for:

- Feature implementation
- Multi-file refactoring
- Test generation
- Background build/test execution

## Agent Decision Matrix

```
Find something in code       → Explore agent (quick)
Understand a system           → Explore agent (very thorough)
Implement a feature           → General-purpose agent
Implement + write tests       → Two general-purpose agents in parallel
Run tests while coding        → Background Bash agent
Research multiple areas       → Multiple Explore agents in parallel
Quality review before merge   → /finalize (includes review + simplification)
Deep code review              → code-reviewer agent
Security audit                → /security-scan skill
Architecture decisions        → architect agent
Test-first implementation     → tdd-guide agent
```

## Workflow Integration

Agents are chained through the `/workflow` orchestrator which auto-detects task type:

| Task Type | Agent Chain |
|-----------|-------------|
| **Feature** | Explore (recon) → Architect (plan) → General-purpose (implement + test) → Code-reviewer (finalize) |
| **Bugfix** | Explore (recon) → General-purpose (fix + test) → Finalize |
| **Hotfix** | General-purpose (fix) → Finalize |
| **Refactor** | Explore (recon) → Architect (plan) → General-purpose (implement) → Code-reviewer (finalize) |
| **Security** | Explore (recon) → Security-reviewer (scan) → General-purpose (fix) → Finalize |

## Cost Optimization

- **Explore agents (Haiku)** — Use freely for any read-only research; fast and cheap
- **Specialized agents (Sonnet)** — Dedicated context window provides deeper analysis than inline work
- **Architect agent (Opus)** — Reserved for system design decisions that justify the cost
- **Background agents** — Offload tests/builds to keep the main context lean

## Tech Stack Context

Agents operate within this project's stack:

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL + Auth + RLS)
- **Styling:** Tailwind CSS v4
- **Deployment:** Vercel (auto-deploys on push to `main`)
- **Email:** Nodemailer / Resend
- **i18n:** next-intl (EN, ES, PL, IT, FR)
