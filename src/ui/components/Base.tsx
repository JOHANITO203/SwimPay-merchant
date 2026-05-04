import { motion } from 'motion/react';
import React, { ReactNode, useState } from 'react';
import { ChevronLeft, Copy, Check, Waves } from 'lucide-react';

export const Logo = ({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-14 w-14'
  };
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizes[size]} bg-brand-deep dark:bg-brand-cyan rounded-xl flex items-center justify-center relative overflow-hidden shadow-premium group`}>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Waves className={`${size === 'sm' ? 'w-4 h-4' : 'w-6 h-6'} text-brand-cyan dark:text-brand-deep stroke-[2.5px] relative z-10`} />
      </div>
      {size !== 'sm' && (
        <span className={`${size === 'lg' ? 'text-2xl' : 'text-xl'} font-black tracking-tight text-brand-deep dark:text-slate-100`}>
          Swim<span className="text-brand-cyan">Pay</span>
        </span>
      )}
    </div>
  );
};

export const MobileShell = ({ children, title, onBack, showHeader = true, footer }: { 
  children: ReactNode, 
  title?: string, 
  onBack?: () => void,
  showHeader?: boolean,
  footer?: ReactNode
}) => {
  return (
    <div className="flex justify-center bg-slate-100 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="relative w-full max-w-md bg-[#F8FAFC] dark:bg-[#020617] min-h-screen flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.1)] gradient-mesh transition-colors duration-300">
        {showHeader && (
          <header className="px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 z-20 bg-[#F8FAFC]/80 dark:bg-[#020617]/80 backdrop-blur-xl">
            {onBack ? (
              <button 
                onClick={onBack} 
                className="p-2.5 -ml-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-slate-200 dark:hover:border-slate-700 transition-all active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 text-brand-deep dark:text-slate-200" />
              </button>
            ) : <Logo size="sm" />}
            
            {title && (
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 absolute left-1/2 -translate-x-1/2">
                {title}
              </h2>
            )}
            
            <div className="w-10 flex justify-end">
              <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden p-1">
                <div className="w-full h-full rounded-full bg-brand-light dark:bg-brand-deep flex items-center justify-center font-black text-[8px] text-brand-cyan">MP</div>
              </div>
            </div>
          </header>
        )}
        
        <main className="flex-1 flex flex-col p-6 overflow-y-auto scrollbar-hide">
          {children}
        </main>

        {footer && (
          <div className="p-6 pt-2 pb-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 sticky bottom-0 z-20">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  disabled = false
}: { 
  children: ReactNode, 
  onClick?: () => void, 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger',
  className?: string,
  disabled?: boolean
}) => {
  const base = "w-full py-4.5 px-6 rounded-3xl font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-brand-deep dark:bg-brand-cyan text-white dark:text-brand-deep shadow-xl shadow-brand-deep/10 dark:shadow-brand-cyan/10 hover:shadow-brand-deep/20 dark:hover:shadow-brand-cyan/20",
    secondary: "bg-brand-cyan dark:bg-slate-800 text-white dark:text-brand-cyan shadow-xl shadow-brand-cyan/20 dark:shadow-black/20 hover:bg-brand-cyan/90 dark:hover:bg-slate-700",
    outline: "bg-white dark:bg-transparent border border-slate-200 dark:border-slate-800 text-brand-deep dark:text-slate-100 shadow-sm hover:border-brand-deep/10 dark:hover:border-brand-cyan/50",
    ghost: "text-slate-500 dark:text-slate-400 hover:text-brand-deep dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900",
    danger: "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40"
  };

  return (
    <motion.button 
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export const Card = ({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void, [key: string]: any }) => (
  <div 
    onClick={onClick}
    className={`premium-card p-6 ${onClick ? 'cursor-pointer active:scale-[0.98] transition-all hover:bg-slate-50/50 dark:hover:bg-slate-800/50' : ''} ${className}`}
  >
    {children}
  </div>
);

export const StatusChip = ({ status }: { status: string }) => {
  const configs: Record<string, { label: string, classes: string }> = {
    pending_review: { label: 'Verification', classes: 'bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-400 border-amber-200 dark:border-amber-800/50 shadow-sm shadow-amber-900/5' },
    validated: { label: 'Confirmed', classes: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50 shadow-sm shadow-emerald-900/5' },
    pending_payment: { label: 'Awaiting', classes: 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-400 border-blue-200 dark:border-blue-800/50 shadow-sm shadow-blue-900/5' },
    rejected: { label: 'Rejected', classes: 'bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-400 border-red-200 dark:border-red-800/50 shadow-sm shadow-red-900/5' },
    expired: { label: 'Expired', classes: 'bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-slate-400 border-slate-200 dark:border-slate-700 shadow-sm shadow-slate-900/5' },
  };

  const config = configs[status] || configs.pending_review;

  return (
    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${config.classes}`}>
      {config.label}
    </span>
  );
};

export const MetricCard = ({ icon: Icon, label, value, colorClass = "text-brand-deep dark:text-slate-100", trend }: { icon: any, label: string, value: string | number, colorClass?: string, trend?: string }) => (
  <Card className="flex flex-col gap-3 flex-1">
    <div className="flex items-center justify-between">
      <div className="p-2.5 w-fit rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
        <Icon className="w-5 h-5 text-brand-teal dark:text-brand-cyan" />
      </div>
      {trend && (
        <span className={`text-[10px] font-bold ${trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
          {trend}
        </span>
      )}
    </div>
    <div className="flex flex-col gap-0.5">
      <span className="data-label">{label}</span>
      <span className={`text-2xl font-black tracking-tight ${colorClass}`}>{value}</span>
    </div>
  </Card>
);

export const CopyField = ({ label, value }: { label: string, value: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="data-label ml-1">{label}</span>
      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <span className="data-value text-sm truncate mr-4 text-brand-deep dark:text-slate-200">{value}</span>
        <button onClick={handleCopy} className="text-brand-teal dark:text-brand-cyan p-2 bg-brand-light dark:bg-brand-cyan/10 rounded-xl hover:bg-brand-teal dark:hover:bg-brand-cyan hover:text-white dark:hover:text-brand-deep transition-all">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export const Timeline = ({ items }: { items: { label: string, time: string, completed: boolean }[] }) => (
  <div className="flex flex-col gap-8 relative py-2">
    <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-100 dark:bg-slate-800" />
    {items.map((item, i) => (
      <div key={i} className="flex gap-5 items-start relative z-10">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-premium border-2 border-white dark:border-slate-900 ${item.completed ? 'bg-brand-deep dark:bg-brand-cyan' : 'bg-slate-100 dark:bg-slate-800'}`}>
          {item.completed ? <Check className="w-4 h-4 text-brand-cyan dark:text-brand-deep" /> : <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />}
        </div>
        <div className="flex-1">
          <p className={`text-sm font-black tracking-tight ${item.completed ? 'text-brand-deep dark:text-slate-200' : 'text-slate-400 dark:text-slate-600'}`}>{item.label}</p>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-0.5 uppercase tracking-wider">{item.time}</p>
        </div>
      </div>
    ))}
  </div>
);

export const Input = ({ label, placeholder, type = 'text', value, onChange }: { label?: string, placeholder?: string, type?: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="flex flex-col gap-2">
    {label && <span className="data-label ml-1">{label}</span>}
    <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-5 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-brand-teal dark:focus:border-brand-cyan transition-all text-brand-deep dark:text-slate-100 shadow-sm"
    />
  </div>
);

