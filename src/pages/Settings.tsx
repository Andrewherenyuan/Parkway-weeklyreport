import { useState } from 'react';
import { User, Bell, Shield, Palette, Database, HelpCircle, ChevronRight } from 'lucide-react';
import { mockUser } from '@/data/mockData';

export function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);

  const sections = [
    { id: 'profile', icon: User, label: '个人信息' },
    { id: 'notifications', icon: Bell, label: '通知设置' },
    { id: 'security', icon: Shield, label: '安全设置' },
    { id: 'appearance', icon: Palette, label: '外观设置' },
    { id: 'data', icon: Database, label: '数据管理' },
    { id: 'help', icon: HelpCircle, label: '帮助与支持' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">个人资料</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-medical-blue-100 to-medical-teal-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-medical-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{name}</p>
                  <p className="text-sm text-gray-500">{email}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="medical-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="medical-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">角色</label>
                  <div className="medical-input bg-gray-50 text-gray-600 cursor-not-allowed">
                    {mockUser.role === 'admin' ? '管理员' : '普通用户'}
                  </div>
                </div>
              </div>

              <button className="medical-btn-primary mt-6">
                保存更改
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">通知设置</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">周报提醒</p>
                  <p className="text-sm text-gray-500">每周五下午发送周报提醒</p>
                </div>
                <button className="w-12 h-6 bg-medical-blue-500 rounded-full relative transition-colors">
                  <span className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow transition-transform" />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">周报评论通知</p>
                  <p className="text-sm text-gray-500">当他人评论您的周报时发送通知</p>
                </div>
                <button className="w-12 h-6 bg-gray-200 rounded-full relative transition-colors">
                  <span className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform" />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">系统更新通知</p>
                  <p className="text-sm text-gray-500">接收系统更新和新功能通知</p>
                </div>
                <button className="w-12 h-6 bg-medical-blue-500 rounded-full relative transition-colors">
                  <span className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow transition-transform" />
                </button>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">安全设置</h3>
            
            <div className="space-y-3">
              <button className="w-full p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium text-gray-800">修改密码</p>
                  <p className="text-sm text-gray-500">定期更换密码以保障账户安全</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              
              <button className="w-full p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium text-gray-800">双因素认证</p>
                  <p className="text-sm text-gray-500">增加账户安全性</p>
                </div>
                <span className="text-sm text-medical-blue-600 font-medium">未启用</span>
              </button>
              
              <button className="w-full p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium text-gray-800">登录设备管理</p>
                  <p className="text-sm text-gray-500">查看和管理登录过的设备</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">外观设置</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">主题模式</label>
              <div className="grid grid-cols-3 gap-3">
                <button className="p-4 bg-gray-100 rounded-lg border-2 border-medical-blue-500 hover:bg-gray-200 transition-colors">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-800">浅色模式</p>
                </button>
                <button className="p-4 bg-gray-800 rounded-lg border-2 border-transparent hover:bg-gray-700 transition-colors">
                  <div className="w-8 h-8 bg-gray-600 rounded-full mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-300">深色模式</p>
                </button>
                <button className="p-4 bg-gray-100 rounded-lg border-2 border-transparent hover:bg-gray-200 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-r from-gray-300 to-gray-600 rounded-full mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-800">跟随系统</p>
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">字体大小</label>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-medical-blue-500 text-white rounded-lg text-sm font-medium">A</button>
                <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium">A</button>
                <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium">A</button>
              </div>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">数据管理</h3>
            
            <div className="space-y-3">
              <button className="w-full p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium text-gray-800">导出数据</p>
                  <p className="text-sm text-gray-500">将您的所有数据导出为JSON文件</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              
              <button className="w-full p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium text-gray-800">清除缓存</p>
                  <p className="text-sm text-gray-500">清除本地缓存数据</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">帮助与支持</h3>
            <div className="space-y-3">
              <button className="w-full p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium text-gray-800">使用指南</p>
                  <p className="text-sm text-gray-500">查看详细的使用说明</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium text-gray-800">联系支持</p>
                  <p className="text-sm text-gray-500">获取技术支持与帮助</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">设置</h1>
        <p className="text-sm text-gray-500 mt-1">管理您的账户与偏好设置</p>
      </div>

      <div className="flex gap-6">
        <nav className="w-48 space-y-1 flex-shrink-0">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-medical-blue-50 text-medical-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <section.icon className="w-5 h-5" />
              {section.label}
            </button>
          ))}
        </nav>

        <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}