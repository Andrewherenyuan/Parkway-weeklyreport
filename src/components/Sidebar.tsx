import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  BarChart3, 
  Settings,
  User,
  Stethoscope
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: '仪表盘', path: '/' },
    { icon: FileText, label: '周报库', path: '/reports' },
    { icon: PlusCircle, label: '新建周报', path: '/reports/new' },
    { icon: BarChart3, label: '数据分析', path: '/analytics' },
    { icon: Settings, label: '设置', path: '/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-100 z-40 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-medical-blue-500 to-medical-teal-500 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">医疗周报</h1>
              <p className="text-xs text-gray-500">Medical Report</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-10 h-10 bg-gradient-to-br from-medical-blue-500 to-medical-teal-500 rounded-xl flex items-center justify-center mx-auto">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive(item.path)
                    ? 'bg-medical-blue-50 text-medical-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${
                  isActive(item.path) ? 'text-medical-blue-600' : ''
                }`} />
                {!collapsed && (
                  <span className="text-sm">{item.label}</span>
                )}
                {!collapsed && isActive(item.path) && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-medical-blue-500" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-3 border-t border-gray-100">
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all duration-200"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-medical-teal-100 to-medical-blue-100 flex items-center justify-center">
            <User className="w-4 h-4 text-medical-blue-600" />
          </div>
          {!collapsed && (
            <div className="text-left flex-1">
              <p className="text-sm font-medium text-gray-800">张明医生</p>
              <p className="text-xs text-gray-500">zhangming@medical.com</p>
            </div>
          )}
        </button>
      </div>

      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-all duration-200 shadow-sm"
      >
        <svg className={`w-3 h-3 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </aside>
  );
}
