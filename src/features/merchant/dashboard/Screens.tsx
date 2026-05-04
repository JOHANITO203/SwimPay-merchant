import { DashboardShell } from '../DashboardShell';
import { Card, MetricCard, StatusChip, Button, Logo } from '@/src/ui/components/Base';
import { Eye, CheckCircle2, Bell, Smartphone, ChevronRight, LayoutGrid, ArrowUpRight, TrendingUp, Calendar, Zap, Edit, Pause, Star, Smartphone as PhoneIcon, CreditCard, Shield } from 'lucide-react';
import { MOCK_PAYMENTS } from '@/src/mock';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/src/context/ThemeContext';

const CHART_DATA = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 600 },
  { name: 'Thu', value: 800 },
  { name: 'Fri', value: 500 },
  { name: 'Sat', value: 900 },
  { name: 'Sun', value: 700 },
];

export const Dashboard = () => {
  const { theme } = useTheme();
  
  return (
    <DashboardShell activeTab="dashboard">
      <div className="flex flex-col gap-8 pb-10">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-brand-deep dark:text-slate-100 tracking-tight">Vue d'ensemble</h1>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Terminal de paiement actif</p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-brand-teal dark:text-brand-cyan transition-colors">
            <Calendar className="w-5 h-5" />
          </div>
        </header>
        
        {/* Hero Stat */}
        <Card className="bg-brand-deep border-none p-8 text-white relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-brand-cyan/20 blur-3xl group-hover:bg-brand-cyan/30 transition-colors" />
          <div className="relative z-10 space-y-4">
             <div className="flex items-center gap-2 text-brand-cyan">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Activité ce mois</span>
             </div>
             <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tighter">1 482 000</span>
                <span className="text-lg font-bold text-white/50 tracking-tight">₽</span>
             </div>
             <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded-lg text-[10px] font-bold text-emerald-400">
                  <ArrowUpRight className="w-3 h-3" /> +12.5%
                </div>
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">vs mois dernier</span>
             </div>
          </div>
        </Card>

        {/* Bento Grid Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <MetricCard icon={Eye} label="À vérifier" value={7} trend="+2 new" />
          <MetricCard icon={CheckCircle2} label="Validés" value={24} trend="+84%" />
          
          <Card className="col-span-2 flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <span className="data-label">Tendances des paiements</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-brand-cyan" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Réussite</span>
                </div>
              </div>
            </div>
            <div className="h-48 w-full -ml-4 pr-0">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHART_DATA}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: theme === 'dark' ? '#475569' : '#94a3b8', fontWeight: 600 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '16px', 
                        border: 'none', 
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                        backgroundColor: theme === 'dark' ? '#0F172A' : '#FFFFFF',
                        color: theme === 'dark' ? '#F8FAFC' : '#0F172A'
                      }}
                      itemStyle={{ fontSize: '12px', fontWeight: '800', color: '#0EA5E9' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#0EA5E9" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
          </Card>

        <MetricCard icon={Bell} label="Notifications" value={512} />
        <MetricCard icon={Zap} label="Statut App" value="Online" colorClass="text-emerald-500" />
      </div>

      {/* Recent Activity */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-1">
           <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Paiements Récents</h3>
           <button className="text-[10px] font-black uppercase tracking-widest text-brand-teal">Voir tout</button>
        </div>
        
        <div className="flex flex-col gap-3">
          {MOCK_PAYMENTS.map(p => (
            <Card key={p.id} className="flex items-center gap-4 py-4 px-5 group">
               <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-lg font-black text-slate-300 dark:text-slate-700 group-hover:bg-brand-light dark:group-hover:bg-brand-deep/20 group-hover:text-brand-teal transition-colors">
                  {p.bank[0]}
               </div>
               <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                     <span className="font-black text-brand-deep dark:text-slate-100 tracking-tight truncate">{p.amount} {p.currency}</span>
                     <StatusChip status={p.status} />
                  </div>
                  <p className="data-label mt-1 lowercase first-letter:uppercase">{p.bank} • {p.time}</p>
               </div>
               <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-300 dark:text-slate-700 group-hover:text-brand-deep dark:group-hover:text-brand-cyan transition-colors">
                  <ChevronRight className="w-5 h-5" />
               </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </DashboardShell>
  );
};

export const ReceivingMethods = () => (
  <DashboardShell activeTab="more">
    <div className="flex flex-col gap-8 pb-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-brand-deep dark:text-slate-100 tracking-tight">Canaux de réception</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">Gérez vos identifiants bancaires et portefeuilles SBP configurés sur ce terminal.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="py-5 px-4 flex flex-col items-center gap-2 h-auto rounded-3xl">
          <div className="p-2 bg-brand-light rounded-xl text-brand-teal">
            <CreditCard className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Ajouter Carte</span>
        </Button>
        <Button variant="outline" className="py-5 px-4 flex flex-col items-center gap-2 h-auto rounded-3xl">
          <div className="p-2 bg-brand-light rounded-xl text-brand-teal">
            <PhoneIcon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Ajouter Mobile</span>
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {[
          { type: 'card', name: 'Sberbank Platinum', id: '• • • • 4821', icon: CreditCard },
          { type: 'phone', name: 'T-Bank Business', id: '+7 * * * 45-67', icon: PhoneIcon }
        ].map((method) => (
          <Card key={method.id} className="flex flex-col gap-6 !p-0 overflow-hidden shadow-soft transition-colors">
            <div className="p-6 flex items-center gap-5">
              <div className="p-4 bg-brand-deep dark:bg-brand-cyan/10 rounded-2xl text-brand-cyan shadow-sm">
                <method.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-brand-deep dark:text-slate-100 tracking-tight">{method.name}</h3>
                <p className="data-value text-xs text-slate-400 mt-0.5">{method.id}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Actif</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 border-t border-slate-50 dark:border-slate-800 bg-[#F8FAFC]/50 dark:bg-slate-900/50">
              <button className="flex items-center justify-center gap-2 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-deep dark:hover:text-slate-200 transition-colors border-r border-slate-100 dark:border-slate-800">
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button className="flex items-center justify-center gap-2 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-deep dark:hover:text-slate-200 transition-colors border-r border-slate-100 dark:border-slate-800">
                <Pause className="w-3.5 h-3.5" />
              </button>
              <button className="flex items-center justify-center gap-2 py-4 text-[10px] font-black uppercase tracking-widest text-brand-teal dark:text-brand-cyan">
                <Star className="w-3.5 h-3.5 fill-brand-teal dark:fill-brand-cyan" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <div className="p-6 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden flex items-center gap-6">
         <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-brand-cyan shrink-0">
            <Shield className="w-8 h-8" />
         </div>
         <div>
            <h4 className="font-black text-sm uppercase tracking-widest text-brand-cyan">Confidentialité</h4>
            <p className="text-[11px] text-white/50 leading-relaxed font-medium mt-1">Vos données sont stockées localement. Aucun identifiant complet ne quitte ce terminal.</p>
         </div>
      </div>
    </div>
  </DashboardShell>
);
