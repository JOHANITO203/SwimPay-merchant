import { DashboardShell } from '../DashboardShell';
import { Card, StatusChip, Button, Logo, MobileShell } from '@/src/ui/components/Base';
import { LayoutGrid, Clock, CheckCircle2, XCircle, Search, ChevronRight, AlertCircle, Eye, Info, ShieldCheck, Fingerprint, Banknote, Terminal } from 'lucide-react';
import { MOCK_PAYMENTS, MOCK_BANKS } from '@/src/mock';
import { useState } from 'react';

export const ReviewPayments = () => {
  const [filter, setFilter] = useState('review');
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  
  const filters = [
    { id: 'all', label: 'Tout', icon: LayoutGrid },
    { id: 'review', label: 'Vérification', icon: Clock },
    { id: 'valid', label: 'Conformes', icon: CheckCircle2 },
    { id: 'reject', label: 'Rejetés', icon: XCircle },
    { id: 'expire', label: 'Expirés', icon: Clock },
  ];

  if (selectedPayment) {
    return <PaymentDetail pId={selectedPayment} onBack={() => setSelectedPayment(null)} />;
  }

  return (
    <DashboardShell activeTab="reviews">
      <div className="flex flex-col gap-8 pb-20">
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-brand-deep dark:text-slate-100 tracking-tight">Signalements Reçus</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Confirmez les paiements détectés par votre terminal Android.</p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
          {filters.map((f) => (
            <button 
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] whitespace-nowrap transition-all border
                ${filter === f.id ? 'bg-brand-deep dark:bg-brand-cyan border-brand-deep dark:border-brand-cyan text-brand-cyan dark:text-brand-deep shadow-lg shadow-brand-deep/20' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:border-brand-cyan'}`}
            >
              <f.icon className="w-3.5 h-3.5" /> {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {MOCK_PAYMENTS.map((p) => {
             const bankLogo = MOCK_BANKS.find(b => b.name === p.bank)?.logo;
             return (
              <Card key={p.id} onClick={() => setSelectedPayment(p.id)} className="flex flex-col gap-5 p-6 group cursor-pointer">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-2.5 shadow-sm group-hover:border-brand-teal/30 transition-all">
                       {bankLogo ? (
                         <img src={bankLogo} alt={p.bank} className="w-full h-full object-contain" />
                       ) : (
                         <div className="w-10 h-10 rounded-xl bg-brand-deep dark:bg-brand-cyan flex items-center justify-center text-brand-cyan dark:text-brand-deep text-lg font-black">
                            {p.bank[0]}
                         </div>
                       )}
                    </div>
                    <div className="flex-1">
                       <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xl font-black text-brand-deep dark:text-slate-100 tracking-tighter">{p.amount} {p.currency}</span>
                          <StatusChip status={p.status} />
                       </div>
                       <p className="data-label lowercase">{p.bank}</p>
                    </div>
                 </div>
                 
                 <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800/50">
                    <div className="flex items-center gap-2">
                       <div className="p-1 px-2 bg-slate-50 dark:bg-slate-900/50 rounded-md">
                         <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{p.time}</span>
                       </div>
                       <div className="flex items-center gap-1.5 ml-1">
                          {p.status === 'pending_review' ? <Search className="w-3 h-3 text-amber-500" /> : <ShieldCheck className="w-3 h-3 text-emerald-500" />}
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">{p.status === 'pending_review' ? 'Validation requise' : 'Signaux cohérents'}</span>
                       </div>
                    </div>
                    <div className="p-2 bg-brand-light dark:bg-brand-deep rounded-xl text-brand-teal dark:text-brand-cyan group-hover:bg-brand-deep dark:group-hover:bg-brand-cyan group-hover:text-brand-cyan dark:group-hover:text-brand-deep transition-all">
                       <ChevronRight className="w-4 h-4" />
                    </div>
                 </div>
              </Card>
             );
          })}
        </div>
      </div>
    </DashboardShell>
  );
};

export const PaymentDetail = ({ pId = 'p1', onBack }: { pId?: string, onBack: () => void }) => {
  const p = MOCK_PAYMENTS.find(x => x.id === pId) || MOCK_PAYMENTS[0];
  const bankLogo = MOCK_BANKS.find(b => b.name === p.bank)?.logo;
  
  return (
    <MobileShell title="Inspection Signal" onBack={onBack}>
      <div className="flex flex-col gap-8 pb-10">
        <div className="flex flex-col items-center gap-4 mt-4">
           <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center justify-center p-5 shadow-premium text-brand-cyan relative group">
              {bankLogo ? (
                <img src={bankLogo} alt={p.bank} className="w-full h-full object-contain" />
              ) : (
                <Fingerprint className="w-12 h-12 text-brand-deep dark:text-brand-cyan" />
              )}
              <div className="absolute -top-1 -right-1 w-7 h-7 bg-amber-500 rounded-full border-4 border-[#F8FAFC] dark:border-[#020617] animate-pulse" />
           </div>
           <div className="text-center space-y-1">
              <h1 className="text-3xl font-black text-brand-deep dark:text-slate-100 tracking-tighter">{p.amount} <span className="text-brand-cyan">₽</span></h1>
              <p className="data-label">Vérification Manuelle</p>
           </div>
        </div>

        <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-100/50 dark:border-amber-800/30 p-6 flex flex-col gap-4 shadow-none">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl text-amber-500 shadow-sm">
               <AlertCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-black text-amber-900 dark:text-amber-200 uppercase tracking-widest">Alerte Détectée</h2>
              <p className="text-[11px] text-amber-900/60 dark:text-amber-400/60 font-bold leading-relaxed mt-1">Le système a détecté un virement entrant, mais la référence ne correspond pas exactement à la commande #4812.</p>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Preuves & Données</h3>
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-soft">
             {[
               { label: 'Montant Saisi', value: `${p.amount} ${p.currency}`, icon: LayoutGrid },
               { label: 'Montant Reçu', value: `${p.amount} ${p.currency}`, icon: Eye },
               { label: 'Émetteur', value: 'Ivan P.', icon: Fingerprint },
               { label: 'Banque Destination', value: p.bank, icon: Banknote },
               { label: 'ID Transaction', value: p.reference, icon: Terminal },
               { label: 'Capture Horloge', value: p.time, icon: Clock },
             ].map((item, i) => (
               <div key={i} className={`flex items-center gap-5 p-5 ${i !== 0 ? 'border-t border-slate-50 dark:border-slate-800/50' : ''}`}>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-300 dark:text-slate-600">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 flex-1">{item.label}</span>
                  <span className="data-value text-xs text-brand-deep dark:text-slate-200">{item.value}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-10">
           <Button variant="secondary" onClick={onBack} className="flex items-center justify-center gap-2">
             <CheckCircle2 className="w-4 h-4" /> Confirmer & Valider
           </Button>
           <Button variant="outline" onClick={onBack} className="flex items-center justify-center gap-2 border-red-100 text-red-500 hover:bg-red-50 transition-colors">
             <XCircle className="w-4 h-4" /> Rejeter comme faux
           </Button>
           <p className="text-[10px] text-center text-slate-400 font-bold px-10 leading-relaxed group">
              <Info className="w-3 h-3 inline mr-1 -mt-0.5 group-hover:text-brand-teal transition-colors" />
              La validation manuelle impacte instantanément le webhook envoyé au marchand.
           </p>
        </div>
      </div>
    </MobileShell>
  );
};
