import { mockAnalyticsData, mockReports } from '@/data/mockData';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { TrendingUp, FileText, Clock, CheckCircle2, Calendar, Target, Users, Activity } from 'lucide-react';

export function Analytics() {
  const statCards = [
    { 
      icon: FileText, 
      label: '总周报数', 
      value: mockAnalyticsData.totalReports,
      change: '+12%',
      changeType: 'positive',
      bgColor: 'bg-medical-blue-50',
      iconColor: 'text-medical-blue-600'
    },
    { 
      icon: CheckCircle2, 
      label: '已发布', 
      value: mockAnalyticsData.publishedReports,
      change: '+8%',
      changeType: 'positive',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    { 
      icon: Clock, 
      label: '草稿', 
      value: mockAnalyticsData.draftReports,
      change: '-5%',
      changeType: 'negative',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    { 
      icon: TrendingUp, 
      label: '完成率', 
      value: `${mockAnalyticsData.completionRate}%`,
      change: '+3%',
      changeType: 'positive',
      bgColor: 'bg-medical-teal-50',
      iconColor: 'text-medical-teal-600'
    },
  ];

  const categoryData = [
    { name: '医疗周报', value: 65 },
    { name: '科研报告', value: 25 },
    { name: '部门总结', value: 10 },
  ];

  const COLORS = ['#1976d2', '#00897b', '#6b7280'];

  const weeklyData = mockAnalyticsData.weeklyTrend;

  const monthlyData = [
    { month: '1月', count: 45 },
    { month: '2月', count: 52 },
    { month: '3月', count: 48 },
    { month: '4月', count: 65 },
    { month: '5月', count: 78 },
    { month: '6月', count: 82 },
  ];

  const recentActivity = mockReports.slice(0, 5).map((report, index) => ({
    id: report.id,
    title: report.title,
    status: report.status,
    time: new Date(report.createdAt).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }),
    index: index + 1,
  }));

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => (
          <div key={index} className="medical-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                  <span className={`text-xs font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 medical-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Activity className="w-5 h-5 text-medical-blue-600" />
              周报趋势分析
            </h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-medical-blue-500 text-white text-sm rounded-lg font-medium">
                周
              </button>
              <button className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-lg font-medium hover:bg-gray-200">
                月
              </button>
              <button className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-lg font-medium hover:bg-gray-200">
                年
              </button>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <YAxis domain={[0, 25]} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip 
                  formatter={(value) => [`${value} 份`, '周报数']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#1976d2" 
                  strokeWidth={3}
                  dot={{ fill: '#1976d2', strokeWidth: 2, r: 6 }}
                  activeDot={{ fill: '#1976d2', strokeWidth: 3, r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="medical-card">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-medical-teal-600" />
            周报分类
          </h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, '占比']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="medical-card">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-medical-blue-600" />
            月度统计
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 12 }} />
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
                  fill="url(#monthlyGradient)" 
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient id="monthlyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1976d2" />
                    <stop offset="100%" stopColor="#42a5f5" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="medical-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-medical-teal-600" />
              最近活动
            </h2>
            <button className="text-sm text-medical-blue-600 hover:text-medical-blue-700 font-medium">
              查看全部
            </button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  activity.index <= 3 ? 'bg-medical-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {activity.index}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <span className={`medical-badge ${activity.status === 'published' ? 'medical-badge-published' : 'medical-badge-draft'}`}>
                  {activity.status === 'published' ? '已发布' : '草稿'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
