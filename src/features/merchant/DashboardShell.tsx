import { ReactNode } from 'react';
import { Home, ClipboardList, ShoppingCart, MoreHorizontal, Sun, Moon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Logo } from '@/src/ui/components/Base';
import { motion } from 'motion/react';
import { useTheme } from '@/src/context/ThemeContext';

export const DashboardShell = ({ children, activeTab }: { children: ReactNode, activeTab: string }) => {
  const { theme, toggleTheme } = useTheme();
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Home, path: '/merchant/dashboard' },
    { id: 'reviews', label: 'Revues', icon: ClipboardList, path: '/merchant/reviews' },
    { id: 'orders', label: 'Ventes', icon: ShoppingCart, path: '/merchant/orders' },
    { id: 'more', label: 'Menu', icon: MoreHorizontal, path: '/merchant/settings' },
  ];

  return (
    <div className="flex justify-center bg-slate-100 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="relative w-full max-w-md bg-[#F8FAFC] dark:bg-[#020617] min-h-screen flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.1)] gradient-mesh transition-colors duration-300">
        <header className="px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 z-20 bg-[#F8FAFC]/80 dark:bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 transition-colors duration-300">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
             <button 
               onClick={toggleTheme}
               className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-brand-cyan transition-all"
             >
               {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
             </button>
             <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center relative">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full absolute top-0 right-0 border-2 border-white dark:border-slate-900" />
                <span className="text-[10px] font-black text-brand-deep dark:text-slate-200">JD</span>
             </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col overflow-y-auto px-6 py-4 pb-32 scrollbar-hide">
          {children}
        </main>

        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-around py-4 pb-8 px-4 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] rounded-t-[2.5rem] transition-colors duration-300">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <NavLink 
                key={tab.id} 
                to={tab.path}
                className="flex flex-col items-center gap-1.5 relative group"
              >
                <div className={`p-2 rounded-2xl transition-all duration-500 flex items-center justify-center ${isActive ? 'bg-brand-deep dark:bg-brand-cyan text-brand-cyan dark:text-brand-deep shadow-lg shadow-brand-deep/20' : 'text-slate-400 dark:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                  <tab.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-brand-deep dark:text-slate-200' : 'text-slate-300 dark:text-slate-700 group-hover:text-slate-500 dark:group-hover:text-slate-400'}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -top-1 w-1 h-1 bg-brand-cyan rounded-full"
                  />
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
