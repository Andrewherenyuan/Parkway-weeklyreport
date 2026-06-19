import { FileText, TrendingUp, Clock, CheckCircle2, ArrowRight, Calendar } from 'lucide-react';
import { useReportStore } from '@/store/reportStore';
import { mockAnalyticsData } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export function Dashboard() {
  const { reports } = useReportStore();
  const navigate = useNavigate();

  const recentReports = reports.slice(0, 3);
  const publishedCount = reports.filter(r => r.status === 'published').length;
  const draftCount = reports.filter(r => r.status === 'draft').length;

  const statCards = [
    { 
      icon: FileText, 
      label: '总周报数', 
      value: mockAnalyticsData.totalReports, 
      color: 'from-medical-blue-500 to-medical-blue-600',
      bgColor: 'bg-medical-blue-50'
    },
    { 
      icon: CheckCircle2, 
      label: '已发布', 
      value: publishedCount, 
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      icon: Clock, 
      label: '草稿', 
      value: draftCount, 
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    { 
      icon: TrendingUp, 
      label: '完成率', 
      value: `${mockAnalyticsData.completionRate}%`, 
      color: 'from-medical-teal-500 to-medical-teal-600',
      bgColor: 'bg-medical-teal-50'
    },
  ];

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => (
          <div 
            key={index}
            className="medical-card hover:shadow-lg cursor-pointer transition-all duration-300"
            onClick={() => navigate('/reports')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 medical-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">周报趋势</h2>
            <button className="text-sm text-medical-blue-600 hover:text-medical-blue-700 font-medium">
              查看详情 <ArrowRight className="w-4 h-4 inline ml-1" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAnalyticsData.weeklyTrend} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 20]} />
                <YAxis 
                  type="category" 
                  dataKey="week" 
                  width={60}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} 份`, '周报数']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="url(#colorGradient)" 
                  radius={[0, 4, 4, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1976d2" />
                    <stop offset="100%" stopColor="#00897b" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="medical-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">最近周报</h2>
            <button 
              onClick={() => navigate('/reports')}
              className="text-sm text-medical-blue-600 hover:text-medical-blue-700 font-medium"
            >
              查看全部
            </button>
          </div>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div 
                key={report.id}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => navigate(`/reports/${report.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm line-clamp-1">{report.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(report.createdAt)}
                    </p>
                  </div>
                  <span className={`medical-badge ml-2 ${report.status === 'published' ? 'medical-badge-published' : 'medical-badge-draft'}`}>
                    {report.status === 'published' ? '已发布' : '草稿'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate('/reports/new')}
            className="w-full mt-6 py-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 hover:border-medical-blue-300 hover:text-medical-blue-600 transition-all duration-200 font-medium"
          >
            + 新建周报
          </button>
        </div>
      </div>
    </div>
  );
}
