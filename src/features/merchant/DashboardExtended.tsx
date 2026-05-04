import { useNavigate } from 'react-router-dom';
import { DashboardShell } from './DashboardShell';
import { Card, StatusChip, Logo, Button, MobileShell } from '@/src/ui/components/Base';
import { ShoppingCart, Search, Filter, ChevronRight, CheckCircle2, Link as LinkIcon, Shield, Zap, Key, ClipboardList, Code, XCircle, AlertCircle, Phone, CreditCard, Banknote, HelpCircle, LogOut, ArrowUpRight, Share2, Terminal } from 'lucide-react';
import { MOCK_ORDERS } from '@/src/mock';

export const OrdersList = () => (
  <DashboardShell activeTab="orders">
    <div className="flex flex-col gap-6 pb-20">
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-brand-deep dark:text-slate-100 tracking-tight">Ventes & Commandes</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Historique des transactions e-commerce synchronisées.</p>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 relative group">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 group-focus-within:text-brand-teal transition-colors" />
           <input type="text" placeholder="ID, Client, Montant..." className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/5 transition-all text-brand-deep dark:text-slate-100" />
        </div>
        <button className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-brand-deep dark:hover:text-slate-200 hover:border-slate-300 transition-all active:scale-95 shadow-sm">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {MOCK_ORDERS.map(o => (
           <Card key={o.id} className="flex items-center gap-5 p-5 group">
             <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 rounded-[1.25rem] border border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:bg-brand-light dark:group-hover:bg-brand-deep/20 group-hover:border-brand-teal/20 transition-all">
                <ShoppingCart className="w-6 h-6 text-brand-teal dark:text-brand-cyan" />
             </div>
             <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                   <h3 className="font-black text-brand-deep dark:text-slate-100 tracking-tighter text-base truncate">{o.id}</h3>
                   <span className="text-sm font-black text-brand-deep dark:text-slate-200">{o.amount} ₽</span>
                </div>
                <div className="flex items-center justify-between">
                   <p className="data-label lowercase first-letter:uppercase">{o.customer} • {o.date}</p>
                   <span className={`text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-md ${o.status === 'confirmé' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'}`}>{o.status}</span>
                </div>
             </div>
          </Card>
        ))}
      </div>
    </div>
  </DashboardShell>
);

export const ConnectedSite = ({ onBack }: { onBack?: () => void }) => {
  const content = (
    <div className="flex flex-col gap-8 pb-20">
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-brand-deep dark:text-slate-100 tracking-tight">Intégration API</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">Connectez votre infrastructure backend pour automatiser la validation des commandes.</p>
      </div>

      <Card className="bg-brand-deep text-white border-none p-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-10">
           <Terminal className="w-32 h-32 rotate-12" />
         </div>
         
         <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-brand-cyan/20 rounded-2xl flex items-center justify-center text-brand-cyan">
                  <CheckCircle2 className="w-6 h-6" />
               </div>
               <div>
                  <h2 className="text-lg font-black tracking-tight">Endpoint Actif</h2>
                  <p className="text-[10px] text-white/50 font-black uppercase tracking-widest mt-1">Connecté depuis 42 jours</p>
               </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
               <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Webhook URL</span>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-xs font-mono truncate mr-2">https://api.business.com/v1/swimpay/</span>
                    <button className="text-brand-cyan"><Key className="w-4 h-4" /></button>
                  </div>
               </div>
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Live Traffic Flowing</span>
                  </div>
                  <span className="text-[10px] font-black text-white/40">99.9% Success Rate</span>
               </div>
            </div>
         </div>
      </Card>

      <div className="grid grid-cols-1 gap-3">
        {[
          { label: 'Tester Webhook', desc: 'Simulation événement de paiement.', icon: Zap, color: 'text-brand-cyan' },
          { label: 'Merchant Secret', desc: 'Clé de signature HMAC-SHA256.', icon: Key, color: 'text-amber-500' },
          { label: 'Logs de Trafic', desc: 'Historique des requêtes HTTP.', icon: ClipboardList, color: 'text-slate-400' }
        ].map((item, i) => (
          <Card key={i} className="flex items-center gap-5 p-5 group">
             <div className={`p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm ${item.color} group-hover:scale-110 transition-transform`}>
                <item.icon className="w-5 h-5" />
             </div>
             <div className="flex-1">
                <h4 className="text-sm font-black text-brand-deep dark:text-slate-100 tracking-tight">{item.label}</h4>
                <p className="data-label mt-0.5 lowercase first-letter:uppercase">{item.desc}</p>
             </div>
             <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-brand-deep dark:group-hover:text-slate-200 transition-colors" />
          </Card>
        ))}
      </div>

      <div className="space-y-4">
         <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Notifications Push (App)</h3>
         <div className="space-y-3">
            {[
              { label: 'Paiement confirmé', status: 'Sent', time: '3m ago', icon: CheckCircle2, success: true },
              { label: 'Détention manuelle', status: 'Sent', time: '12m ago', icon: AlertCircle, success: true },
              { label: 'Échec Webhook', status: 'Retry', time: '1h ago', icon: XCircle, success: false },
            ].map((log, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-all">
                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${log.success ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500' : 'bg-red-50 dark:bg-red-900/20 text-red-500'}`}>
                    <log.icon className="w-5 h-5" />
                 </div>
                 <div className="flex-1 min-w-0">
                    <span className="text-xs font-black text-brand-deep dark:text-slate-200 block truncate">{log.label}</span>
                    <span className="data-label text-[9px] mt-0.5">{log.time}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${log.success ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`} />
                    <span className={`text-[9px] font-black uppercase tracking-widest ${log.success ? 'text-slate-400 dark:text-slate-500' : 'text-red-500'}`}>{log.status}</span>
                 </div>
              </div>
            ))}
         </div>
      </div>

      <Button variant="outline" className="flex items-center justify-center gap-2 group">
         <Code className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Documentation API
      </Button>
    </div>
  );

  if (onBack) {
    return <MobileShell title="Sync Engine" onBack={onBack}>{content}</MobileShell>;
  }

  return (
    <DashboardShell activeTab="more">
      {content}
    </DashboardShell>
  );
};

export const Settings = () => {
  const navigate = useNavigate();
  
  return (
    <DashboardShell activeTab="more">
      <div className="flex flex-col gap-10 pb-20">
        <div className="flex flex-col items-center gap-6 mt-4">
           <div className="relative">
              <div className="w-24 h-24 bg-brand-deep dark:bg-brand-cyan rounded-[2.5rem] flex items-center justify-center text-brand-cyan dark:text-brand-deep shadow-xl shadow-brand-deep/20 dark:shadow-brand-cyan/20 overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                 <Logo size="md" className="!gap-0" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-premium border border-slate-100 dark:border-slate-800">
                 <Share2 className="w-4 h-4 text-brand-teal" />
              </div>
           </div>
           <div className="text-center space-y-1">
              <h2 className="text-2xl font-black text-brand-deep dark:text-slate-100 tracking-tighter">Terminal Marchand</h2>
              <p className="data-label lowercase">UID: #7114-4466-8301</p>
           </div>
        </div>

        <div className="flex flex-col gap-10">
           <section className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 px-1">Infrastructure</h3>
              <div className="bg-white dark:bg-slate-900/40 rounded-4xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-soft">
                 {[
                   { label: 'Paramètres Android', icon: Phone, path: '/merchant/phone' },
                   { label: 'Canaux de Paiement', icon: CreditCard, path: '/merchant/receiving-methods' },
                   { label: 'Comptes Bancaires', icon: Banknote, path: '/merchant/banks' },
                   { label: 'Développeur & API', icon: LinkIcon, path: '/merchant/connected-site' },
                 ].map((item, i) => (
                   <button 
                    key={i} 
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-5 p-6 text-sm font-black text-brand-deep dark:text-slate-200 active:bg-slate-50 dark:active:bg-slate-900 transition-colors ${i !== 0 ? 'border-t border-slate-100 dark:border-slate-800' : ''} group`}
                   >
                      <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-400 dark:text-slate-600 group-hover:bg-brand-light dark:group-hover:bg-brand-deep/20 group-hover:text-brand-teal transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="flex-1 text-left tracking-tight">{item.label}</span>
                      <ChevronRight className="w-5 h-5 text-slate-200 dark:text-slate-700 group-hover:text-brand-deep dark:group-hover:text-brand-cyan transition-colors" />
                   </button>
                 ))}
              </div>
           </section>

           <section className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 px-1">Support & Sécurité</h3>
              <div className="bg-white dark:bg-slate-900/40 rounded-4xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-soft">
                 {[
                   { label: 'Centre de Sécurité', icon: Shield, path: '/merchant/security' },
                   { label: 'Aide & Assistance', icon: HelpCircle, path: '/merchant/support' },
                   { label: 'Conditions Générales', icon: ClipboardList, path: '/merchant/terms' },
                 ].map((item, i) => (
                   <button 
                    key={i} 
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-5 p-6 text-sm font-black text-brand-deep dark:text-slate-200 active:bg-slate-50 dark:active:bg-slate-900 transition-colors ${i !== 0 ? 'border-t border-slate-100 dark:border-slate-800' : ''} group`}
                   >
                      <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-400 dark:text-slate-600 group-hover:bg-brand-light dark:group-hover:bg-brand-deep/20 group-hover:text-brand-teal transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="flex-1 text-left tracking-tight">{item.label}</span>
                      <ChevronRight className="w-5 h-5 text-slate-200 dark:text-slate-700 group-hover:text-brand-deep dark:group-hover:text-brand-cyan transition-colors" />
                   </button>
                 ))}
              </div>
           </section>

           <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-3 text-red-500 font-black uppercase tracking-[0.2em] text-[10px] py-10 opacity-70 hover:opacity-100 transition-opacity"
           >
              <LogOut className="w-4 h-4" /> Se Déconnecter
           </button>
        </div>
      </div>
    </DashboardShell>
  );
};
