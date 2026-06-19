import { Bell, Search } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索周报..."
                className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-medical-blue-500/20 focus:border-medical-blue-400 transition-all"
              />
            </div>
            
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
