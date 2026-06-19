export interface Report {
  id: string;
  title: string;
  content: string;
  templateId: string;
  authorId: string;
  authorName: string;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  content: string;
  category: 'medical' | 'research' | 'general';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AnalyticsData {
  weeklyTrend: { week: string; count: number }[];
  completionRate: number;
  totalReports: number;
  publishedReports: number;
  draftReports: number;
}
