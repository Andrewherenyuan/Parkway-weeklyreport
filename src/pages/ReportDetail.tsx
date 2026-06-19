import { useParams, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useReportStore } from '@/store/reportStore';
import { ArrowLeft, Calendar, User, Share2, Download, Edit2, Eye } from 'lucide-react';

export function ReportDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getReportById, templates } = useReportStore();

  const report = getReportById(id || '');
  const template = templates.find(t => t.id === report?.templateId);

  if (!report) {
    return (
      <div className="medical-card text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500">周报不存在或已被删除</p>
        <button 
          onClick={() => navigate('/reports')}
          className="mt-4 medical-btn-primary"
        >
          返回周报库
        </button>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: ReactNode[] = [];
    let key = 0;
    let currentList: string[] = [];

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={key++} className="list-disc list-inside space-y-1 mb-4">
            {currentList.map((item, i) => (
              <li key={i} className="text-gray-700">{item}</li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    let tableRows: string[][] = [];

    const flushTable = () => {
      if (tableRows.length > 0) {
        const [header, ...rest] = tableRows;
        elements.push(
          <table key={key++} className="w-full border-collapse mb-4 text-sm">
            {header && (
              <thead>
                <tr className="bg-gray-50">
                  {header.map((cell, i) => (
                    <th key={i} className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">{cell.trim()}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {rest.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-200 px-4 py-2 text-gray-700">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
        tableRows = [];
      }
    };

    lines.forEach((line) => {
      if (line.startsWith('### ')) {
        flushList();
        flushTable();
        elements.push(<h3 key={key++} className="text-lg font-semibold text-gray-800 mt-6 mb-3">{line.slice(4)}</h3>);
      } else if (line.startsWith('## ')) {
        flushList();
        flushTable();
        elements.push(<h2 key={key++} className="text-xl font-semibold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-100">{line.slice(3)}</h2>);
      } else if (line.startsWith('# ')) {
        flushList();
        flushTable();
        elements.push(<h1 key={key++} className="text-2xl font-bold text-gray-800 mt-0 mb-6">{line.slice(2)}</h1>);
      } else if (line.startsWith('- ')) {
        flushTable();
        currentList.push(line.slice(2));
      } else if (line.startsWith('|')) {
        flushList();
        const parts = line.split('|').filter(p => p.trim());
        if (!line.includes('---')) {
          tableRows.push(parts);
        }
      } else if (line.trim() === '') {
        flushList();
        flushTable();
      } else {
        flushList();
        flushTable();
        elements.push(<p key={key++} className="text-gray-700 mb-4 leading-relaxed">{line}</p>);
      }
    });

    flushList();
    flushTable();
    return elements;
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/reports')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回
        </button>
        
        <div className="flex-1" />
        
        <button className="medical-btn-outline flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          分享
        </button>
        <button className="medical-btn-outline flex items-center gap-2">
          <Download className="w-4 h-4" />
          导出
        </button>
        <button 
          onClick={() => navigate(`/reports/${id}/edit`)}
          className="medical-btn-primary flex items-center gap-2"
        >
          <Edit2 className="w-4 h-4" />
          编辑
        </button>
      </div>

      <div className="medical-card">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{report.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {report.authorName}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(report.createdAt)}
              </span>
              {template && (
                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                  {template.name}
                </span>
              )}
              <span className={`medical-badge ${report.status === 'published' ? 'medical-badge-published' : 'medical-badge-draft'}`}>
                {report.status === 'published' ? '已发布' : '草稿'}
              </span>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          {renderMarkdown(report.content)}
        </div>
      </div>
    </div>
  );
}
