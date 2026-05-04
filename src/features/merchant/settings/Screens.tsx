import { MobileShell, Card, Button, Input, CopyField } from '@/src/ui/components/Base';
import { Smartphone, Shield, HelpCircle, FileText, Bell, Lock, Fingerprint, Database, Landmark, CreditCard, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { MOCK_BANKS } from '@/src/mock';

// --- INFRASTRUCTURE SCREENS ---

export const PhoneSettings = ({ onBack }: { onBack: () => void }) => (
  <MobileShell title="Paramètres Android" onBack={onBack}>
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex flex-col items-center gap-4 mt-4">
        <div className="w-20 h-20 bg-brand-deep dark:bg-brand-cyan rounded-3xl flex items-center justify-center text-brand-cyan dark:text-brand-deep shadow-xl shadow-brand-deep/20">
          <Smartphone className="w-10 h-10" />
        </div>
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-brand-deep dark:text-white tracking-tighter">Sync Agent v2.4</h1>
          <p className="data-label">Identifiant Terminal: #TERM-8821</p>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">État du Service</h3>
        <Card className="flex items-center justify-between p-5 border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-emerald-900/10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-black text-brand-deep dark:text-emerald-400">Écoute active des notifications</span>
          </div>
          <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">Connecté</span>
        </Card>
      </section>

      <section className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Configuration</h3>
        <div className="space-y-3">
          {[
            { label: 'Lecture SMS bancaires', icon: Bell, status: 'Activé' },
            { label: 'Optimisation batterie', icon: Smartphone, status: 'Ignorer' },
            { label: 'Démarrage automatique', icon: Database, status: 'Activé' },
          ].map((item, i) => (
            <Card key={i} className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-400">
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-black text-brand-deep dark:text-slate-200">{item.label}</span>
              </div>
              <div className="w-10 h-6 bg-brand-deep dark:bg-brand-cyan/20 rounded-full flex items-center px-1 shadow-inner">
                <div className="w-4 h-4 bg-brand-cyan dark:bg-brand-cyan rounded-full translate-x-4 shadow-sm" />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Button variant="outline" className="mt-4 border-red-100 text-red-500">
        Réinitialiser le terminal
      </Button>
    </div>
  </MobileShell>
);

export const BankAccounts = ({ onBack }: { onBack: () => void }) => (
  <MobileShell title="Comptes Bancaires" onBack={onBack}>
    <div className="flex flex-col gap-8 pb-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-brand-deep dark:text-white tracking-tight">Sources Connectées</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Les comptes bankaires dont les notifications sont interceptées.</p>
      </div>

      <div className="flex flex-col gap-4">
        {MOCK_BANKS.slice(0, 3).map((bank, i) => (
          <Card key={bank.id} className="flex items-center gap-5 p-5 group">
            <div className="w-14 h-14 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center p-3 shadow-sm">
               <img src={bank.logo} alt={bank.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-brand-deep dark:text-white tracking-tight">{bank.name}</h3>
              <p className="data-label mt-1">Vérification SBP • Active</p>
            </div>
            <div className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
          </Card>
        ))}
      </div>

      <Button variant="primary" className="flex items-center justify-center gap-2">
        <Landmark className="w-4 h-4" /> Ajouter une banque
      </Button>
    </div>
  </MobileShell>
);

// --- SUPPORT & SECURITY SCREENS ---

export const SecurityCenter = ({ onBack }: { onBack: () => void }) => (
  <MobileShell title="Centre de Sécurité" onBack={onBack}>
    <div className="flex flex-col gap-8 pb-10">
      <div className="p-8 bg-brand-deep dark:bg-brand-deep/80 rounded-[2.5rem] flex flex-col items-center text-center gap-4 border-none shadow-2xl shadow-brand-deep/20">
         <div className="w-16 h-16 bg-brand-cyan/20 rounded-[1.5rem] flex items-center justify-center text-brand-cyan">
            <Shield className="w-8 h-8" />
         </div>
         <div className="space-y-1">
            <h2 className="text-xl font-black text-white tracking-tight">Protection Haute-Fidélité</h2>
            <p className="text-[10px] text-white/50 font-black uppercase tracking-[0.2em]">Dernière analyse: Il y a 12m</p>
         </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[
          { label: 'Chiffrement E2EE', desc: 'Signaux signés par HMAC-SHA256.', icon: Lock, status: 'Actif', color: 'text-brand-cyan' },
          { label: 'Accès Biométrique', desc: 'FaceID / Empreinte digitale requis.', icon: Fingerprint, status: 'Activé', color: 'text-emerald-500' },
          { label: 'Logs d\'audit', desc: 'Historique des accès au terminal.', icon: FileText, status: 'Voir', color: 'text-slate-400' },
        ].map((item, i) => (
          <Card key={i} className="flex items-center gap-5 p-5 group">
            <div className={`p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl ${item.color}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-black text-brand-deep dark:text-white tracking-tight">{item.label}</h4>
              <p className="data-label text-[9px] mt-0.5">{item.desc}</p>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.status}</span>
          </Card>
        ))}
      </div>
    </div>
  </MobileShell>
);

export const HelpSupport = ({ onBack }: { onBack: () => void }) => (
  <MobileShell title="Aide & Assistance" onBack={onBack}>
    <div className="flex flex-col gap-8 pb-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-brand-deep dark:text-white tracking-tight">Comment pouvons-nous vous aider ?</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Consultez nos ressources ou contactez nos experts.</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {[
          { label: 'Base de connaissances', desc: 'Guides complets sur le Sync Engine.', icon: HelpCircle },
          { label: 'Statut du réseau', desc: 'Vérifiez la latence des webhooks.', icon: Database },
          { label: 'Envoyer un ticket', desc: 'Réponse moyenne en 24h.', icon: FileText },
        ].map((item, i) => (
          <Card key={i} className="flex items-center gap-5 p-5 group active:scale-[0.98] transition-all">
            <div className="p-3 bg-brand-light dark:bg-brand-deep/20 rounded-2xl text-brand-teal dark:text-brand-cyan transition-colors">
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-black text-brand-deep dark:text-white tracking-tight">{item.label}</h4>
              <p className="data-label text-[9px] mt-0.5">{item.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </Card>
        ))}
      </div>

      <Card className="bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 p-6 space-y-4">
        <div className="flex items-center gap-3 text-brand-deep dark:text-white">
           <AlertCircle className="w-5 h-5 text-brand-teal" />
           <span className="font-black text-sm tracking-tight">Besoin d'aide immédiate ?</span>
        </div>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          Nos techniciens sont disponibles via Telegram pour toute urgence liée à l'intégration de votre terminal marchand.
        </p>
        <Button variant="secondary" className="w-full">Ouvrir le Chat Telegram</Button>
      </Card>
    </div>
  </MobileShell>
);

export const Conditions = ({ onBack }: { onBack: () => void }) => (
  <MobileShell title="Légal" onBack={onBack}>
    <div className="flex flex-col gap-8 pb-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-brand-deep dark:text-white tracking-tight">Documentations Légales</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Dernière mise à jour: 01 Janv 2026</p>
      </div>

      <div className="flex flex-col gap-4">
        {[
          { label: 'Conditions Générales de Vente', items: 12 },
          { label: 'Politique de Confidentialité', items: 8 },
          { label: 'Traitement des Données (RGPD)', items: 5 },
          { label: 'Utilisation des Cookies', items: 3 },
        ].map((doc, i) => (
          <Card key={i} className="flex items-center gap-5 p-6 group">
            <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-light dark:group-hover:bg-brand-deep/20 group-hover:text-brand-teal transition-all">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1">
               <h4 className="text-sm font-black text-brand-deep dark:text-white tracking-tight">{doc.label}</h4>
               <p className="data-label text-[9px] mt-1">{doc.items} sections • PDF disponible</p>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-300 group-hover:text-brand-deep dark:group-hover:text-white transition-all">
               <ChevronRight className="w-4 h-4" />
            </div>
          </Card>
        ))}
      </div>
      
      <p className="text-[10px] text-center text-slate-400 font-bold px-8 leading-relaxed">
        En utilisant le terminal SwimPay, vous acceptez tacitement l'ensemble des clauses mentionnées ci-dessus.
      </p>
    </div>
  </MobileShell>
);
