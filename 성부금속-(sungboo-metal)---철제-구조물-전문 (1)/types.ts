
export interface SiteConfig {
  siteName: string;
  tagline: string;
  primaryColor: string; // Hex for Gold
  secondaryColor: string; // Hex for White/Dark
  fontFamily: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    naver?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

export interface Post {
  id: string;
  title: string;
  category: '계단' | '난간' | '대문' | '복층공사' | '철구조물' | '기타';
  content: string;
  imageUrl: string;
  date: string;
  isPublished: boolean;
  externalUrl?: string; // Link to Naver Blog post
}

export interface AppState {
  config: SiteConfig;
  posts: Post[];
}
