import { create } from 'zustand';
import type { Report, Template } from '@/types';
import { mockReports, mockTemplates } from '@/data/mockData';

interface ReportStore {
  reports: Report[];
  templates: Template[];
  selectedReportId: string | null;
  setReports: (reports: Report[]) => void;
  addReport: (report: Omit<Report, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateReport: (id: string, updates: Partial<Report>) => void;
  deleteReport: (id: string) => void;
  selectReport: (id: string | null) => void;
  getReportById: (id: string) => Report | undefined;
}

export const useReportStore = create<ReportStore>((set, get) => ({
  reports: mockReports,
  templates: mockTemplates,
  selectedReportId: null,
  
  setReports: (reports) => set({ reports }),
  
  addReport: (report) => {
    const newReport: Report = {
      ...report,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({ reports: [...state.reports, newReport] }));
  },
  
  updateReport: (id, updates) => {
    set((state) => ({
      reports: state.reports.map((report) =>
        report.id === id ? { ...report, ...updates, updatedAt: new Date() } : report
      ),
    }));
  },
  
  deleteReport: (id) => {
    set((state) => ({ reports: state.reports.filter((report) => report.id !== id) }));
  },
  
  selectReport: (id) => set({ selectedReportId: id }),
  
  getReportById: (id) => get().reports.find((report) => report.id === id),
}));
