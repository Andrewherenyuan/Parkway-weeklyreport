import { useState, useEffect, type ReactNode } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReportStore } from '@/store/reportStore';
import { mockUser } from '@/data/mockData';
import { Save, Eye, FileText, Type, List, Table, Download, Upload } from 'lucide-react';

export function ReportEditor() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { templates, addReport, updateReport, getReportById } = useReportStore();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  const isEdit = !!id;

  useEffect(() => {
    if (id) {
      const report = getReportById(id);
      if (report) {
        setTitle(report.title);
        setContent(report.content);
        setSelectedTemplateId(report.templateId);
        setStatus(report.status);
      }
    } else {
      setSelectedTemplateId(templates[0]?.id || '');
      setContent(templates[0]?.content || '');
    }
  }, [id, getReportById, templates]);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template && !title) {
      setContent(template.content);
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('请输入周报标题');
      return;
    }

    if (isEdit && id) {
      updateReport(id, { title, content, templateId: selectedTemplateId, status });
      alert('周报已更新');
    } else {
      addReport({
        title,
        content,
        templateId: selectedTemplateId,
        authorId: mockUser.id,
        authorName: mockUser.name,
        status,
      });
      alert('周报已创建');
    }
    navigate('/reports');
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
        elements.push(<h3 key={key++} className="text-lg font-semibold text-gray-800 mt-6 mb-2">{line.slice(4)}</h3>);
      } else if (line.startsWith('## ')) {
        flushList();
        flushTable();
        elements.push(<h2 key={key++} className="text-xl font-semibold text-gray-800 mt-8 mb-3">{line.slice(3)}</h2>);
      } else if (line.startsWith('# ')) {
        flushList();
        flushTable();
        elements.push(<h1 key={key++} className="text-2xl font-bold text-gray-800 mt-0 mb-4">{line.slice(2)}</h1>);
      } else if (line.startsWith('- ')) {
        flushTable();
        currentList.push(line.slice(2));
      } else if (line.startsWith('|')) {
        flushList();
        const parts = line.split('|').filter(p => p.trim());
        if (!line.includes('---')) {
          tableRows.push(parts);
        }
      } else if (line.trim() !== '') {
        flushList();
        flushTable();
        elements.push(<p key={key++} className="text-gray-700 mb-2">{line}</p>);
      }
    });

    flushList();
    flushTable();
    return elements;
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className={`lg:w-2/3 ${showPreview ? 'hidden' : 'block'}`}>
          <div className="medical-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <select
                  value={selectedTemplateId}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="medical-input w-48"
                >
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>{template.name}</option>
                  ))}
                </select>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">状态:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStatus('draft')}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        status === 'draft' 
                          ? 'bg-yellow-100 text-yellow-700' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      草稿
                    </button>
                    <button
                      onClick={() => setStatus('published')}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        status === 'published' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      发布
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="medical-btn-secondary flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  {showPreview ? '编辑' : '预览'}
                </button>
                <button
                  onClick={handleSave}
                  className="medical-btn-primary flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isEdit ? '保存修改' : '保存周报'}
                </button>
              </div>
            </div>

            <input
              type="text"
              placeholder="输入周报标题..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xl font-semibold text-gray-800 border-none focus:ring-0 mb-6 bg-transparent"
            />

            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
              <button className="p-2 text-gray-500 hover:text-medical-blue-600 hover:bg-medical-blue-50 rounded-lg transition-all" title="标题">
                <Type className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-medical-blue-600 hover:bg-medical-blue-50 rounded-lg transition-all" title="列表">
                <List className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-medical-blue-600 hover:bg-medical-blue-50 rounded-lg transition-all" title="表格">
                <Table className="w-4 h-4" />
              </button>
              <div className="flex-1" />
              <button className="p-2 text-gray-500 hover:text-medical-blue-600 hover:bg-medical-blue-50 rounded-lg transition-all" title="导出">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-medical-blue-600 hover:bg-medical-blue-50 rounded-lg transition-all" title="导入">
                <Upload className="w-4 h-4" />
              </button>
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="开始编写周报内容..."
              className="medical-textarea h-96 font-mono text-sm"
              spellCheck={false}
            />
          </div>
        </div>

        <div className={`lg:w-1/3 ${showPreview ? 'block' : 'hidden'}`}>
          <div className="medical-card sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">预览</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-sm text-medical-blue-600 hover:text-medical-blue-700 font-medium"
              >
                返回编辑
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 min-h-[500px]">
              {title ? (
                <div className="prose prose-sm max-w-none">
                  {renderMarkdown(content)}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                  <FileText className="w-12 h-12 mb-4" />
                  <p>输入内容后预览将显示在这里</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {!showPreview && (
          <div className="lg:w-1/3">
            <div className="medical-card sticky top-24">
              <h3 className="font-semibold text-gray-800 mb-4">模板列表</h3>
              <div className="space-y-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateChange(template.id)}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      selectedTemplateId === template.id
                        ? 'bg-medical-blue-50 border-2 border-medical-blue-300'
                        : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                    }`}
                  >
                    <h4 className={`font-medium ${selectedTemplateId === template.id ? 'text-medical-blue-700' : 'text-gray-800'}`}>
                      {template.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
