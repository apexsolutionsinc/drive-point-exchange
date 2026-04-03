import type { SocialPost } from './types';

function extractIgId(url: string): string {
  const clean = url.split('?')[0].replace(/\/$/, '');
  const reelMatch = clean.split('/reel/')[1];
  if (reelMatch) return reelMatch;
  const postMatch = clean.split('/p/')[1];
  if (postMatch) return postMatch;
  return String(Date.now());
}

export async function fetchTikTokOEmbed(url: string): Promise<SocialPost | null> {
  try {
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`
    );
    if (!res.ok) {
      console.error(`[social/oembed] TikTok oEmbed failed for ${url}: ${res.status}`);
      return null;
    }
    const data = await res.json();
    return {
      id: `tt_${url.split('/video/')[1]?.split('?')[0] || Date.now()}`,
      platform: 'tiktok',
      url,
      thumbnail: data.thumbnail_url || null,
      caption: data.title || null,
      embed_html: data.html || null,
      posted_at: new Date().toISOString(),
    };
  } catch (err) {
    console.error(`[social/oembed] TikTok oEmbed error for ${url}:`, err);
    return null;
  }
}

export async function fetchInstagramOEmbed(
  url: string,
  token: string
): Promise<SocialPost | null> {
  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/instagram_oembed?url=${encodeURIComponent(url)}&access_token=${token}`
    );
    if (!res.ok) {
      console.error(`[social/oembed] Instagram oEmbed failed for ${url}: ${res.status}`);
      return null;
    }
    const data = await res.json();
    return {
      id: `ig_${extractIgId(url)}`,
      platform: 'instagram',
      url,
      thumbnail: data.thumbnail_url || null,
      caption: data.title || null,
      embed_html: data.html || null,
      posted_at: new Date().toISOString(),
    };
  } catch (err) {
    console.error(`[social/oembed] Instagram oEmbed error for ${url}:`, err);
    return null;
  }
}

export async function fetchFacebookOEmbed(
  url: string,
  token: string
): Promise<SocialPost | null> {
  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/oembed_post?url=${encodeURIComponent(url)}&access_token=${token}`
    );
    if (!res.ok) {
      console.error(`[social/oembed] Facebook oEmbed failed for ${url}: ${res.status}`);
      return null;
    }
    const data = await res.json();
    const postId = url.split('/posts/')[1]?.split('?')[0]
      || url.split('/videos/')[1]?.split('?')[0]
      || String(Date.now());
    return {
      id: `fb_${postId}`,
      platform: 'facebook',
      url,
      thumbnail: data.thumbnail_url || null,
      caption: data.title || null,
      embed_html: data.html || null,
      posted_at: new Date().toISOString(),
    };
  } catch (err) {
    console.error(`[social/oembed] Facebook oEmbed error for ${url}:`, err);
    return null;
  }
}

export async function fetchYouTubeOEmbed(url: string): Promise<SocialPost | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
    );
    if (!res.ok) {
      console.error(`[social/oembed] YouTube oEmbed failed for ${url}: ${res.status}`);
      return null;
    }
    const data = await res.json();
    const cleanUrl = url.split('?')[0];
    const videoId = url.match(/(?:v=|\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]+)/)?.[1]
      || String(Date.now());
    return {
      id: `yt_${videoId}`,
      platform: 'youtube',
      url,
      thumbnail: data.thumbnail_url || null,
      caption: data.title || null,
      embed_html: data.html || null,
      posted_at: new Date().toISOString(),
    };
  } catch (err) {
    console.error(`[social/oembed] YouTube oEmbed error for ${url}:`, err);
    return null;
  }
}
