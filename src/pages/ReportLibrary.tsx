import { useState } from 'react';
import { useReportStore } from '@/store/reportStore';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Calendar, MoreVertical, Eye, Edit2, Trash2, FileText } from 'lucide-react';

export function ReportLibrary() {
  const { reports, deleteReport } = useReportStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这份周报吗？')) {
      deleteReport(id);
      setActiveMenu(null);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索周报标题..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="medical-input"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
              className="medical-input w-32"
            >
              <option value="all">全部状态</option>
              <option value="published">已发布</option>
              <option value="draft">草稿</option>
            </select>
          </div>
        </div>

        <button 
          onClick={() => navigate('/reports/new')}
          className="medical-btn-primary flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          新建周报
        </button>
      </div>

      <div className="medical-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  标题
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  创建时间
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReports.map((report, index) => (
                <tr 
                  key={report.id} 
                  className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-medical-blue-100 to-medical-teal-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-medical-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 hover:text-medical-blue-600 cursor-pointer transition-colors">
                          {report.title}
                        </h3>
                        <p className="text-sm text-gray-500">{report.authorName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`medical-badge ${report.status === 'published' ? 'medical-badge-published' : 'medical-badge-draft'}`}>
                      {report.status === 'published' ? '已发布' : '草稿'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {formatDate(report.createdAt)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => navigate(`/reports/${report.id}`)}
                        className="p-2 text-gray-400 hover:text-medical-blue-600 hover:bg-medical-blue-50 rounded-lg transition-all"
                        title="查看"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => navigate(`/reports/${report.id}/edit`)}
                        className="p-2 text-gray-400 hover:text-medical-blue-600 hover:bg-medical-blue-50 rounded-lg transition-all"
                        title="编辑"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      
                      <div className="relative">
                        <button
                          onClick={() => setActiveMenu(activeMenu === report.id ? null : report.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        
                        {activeMenu === report.id && (
                          <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                            <button
                              onClick={() => handleDelete(report.id)}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              删除
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">暂无周报数据</p>
            <button 
              onClick={() => navigate('/reports/new')}
              className="mt-4 medical-btn-primary"
            >
              创建第一份周报
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
