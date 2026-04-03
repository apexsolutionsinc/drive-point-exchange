export interface SocialPost {
  id: string;
  platform: Platform;
  url: string;
  thumbnail: string | null;
  caption: string | null;
  embed_html: string | null;
  posted_at: string | null;
}

export type Platform = 'instagram' | 'facebook' | 'tiktok' | 'youtube';

export interface RefreshResult {
  platform: string;
  success: boolean;
  count: number;
  error?: string;
}
