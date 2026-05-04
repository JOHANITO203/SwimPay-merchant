import { MobileShell, Button, Card, Logo } from '@/src/ui/components/Base';
import { Zap, CheckCircle2, Link, Shield, Smartphone, Landmark, Building2, User, Globe, ArrowRight, Sparkles, Fingerprint, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_BANKS } from '@/src/mock';

/**
 * Onboarding Progress Indicator component
 */
const Progress = ({ step }: { step: number }) => (
  <div className="flex gap-1.5 mb-8">
    {[1, 2, 3, 4, 5].map((s) => (
      <div 
        key={s} 
        className={`h-1 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-brand-deep dark:bg-brand-cyan' : 'bg-slate-100 dark:bg-slate-800'}`}
      />
    ))}
  </div>
);

export const Welcome = ({ onNext }: { onNext: () => void }) => (
  <MobileShell showHeader={false}>
    <div className="flex-1 flex flex-col justify-between py-10">
      <div className="flex flex-col items-center gap-8 mt-12">
        <Logo size="lg" className="flex-col !gap-4" />
        <div className="text-center space-y-3 px-2">
          <h1 className="text-3xl font-black text-brand-deep dark:text-slate-100 tracking-tight transition-colors">Vendez en toute <span className="text-brand-cyan">Fluidité</span>.</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed px-4 transition-colors">
            Transformez votre téléphone Android en un terminal intelligent détectant les notifications bancaires instantanément.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { icon: Zap, title: "Détection Sync Engine", desc: "Lecture intelligente des signaux bancaires SBP.", color: "text-brand-cyan" },
          { icon: ShieldCheck, title: "Zero Trust Privacy", desc: "Vos données sécurisées localement sur l'appareil.", color: "text-emerald-500" },
          { icon: Sparkles, title: "Webhook Instant", desc: "Activez vos services dès que le paiement est reçu.", color: "text-amber-500" }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="flex items-center gap-5 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-soft transition-colors"
          >
            <div className={`p-3 bg-[#F8FAFC] dark:bg-slate-800 rounded-2xl ${item.color}`}>
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-black text-brand-deep dark:text-slate-100 tracking-tight transition-colors">{item.title}</h3>
              <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5 transition-colors">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="pt-8">
        <Button onClick={onNext} variant="primary">Initier la configuration</Button>
      </div>
    </div>
  </MobileShell>
);

export const ConnectPhone = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => (
  <MobileShell title="Autorisation" onBack={onBack}>
    <div className="flex-1 flex flex-col gap-8 py-4">
      <Progress step={1} />
      
      <div className="space-y-3">
        <h2 className="text-3xl font-black text-brand-deep dark:text-slate-100 tracking-tighter">Écoute Active</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
          Pour valider les paiements automatiques, SwimPay nécessite l'accès au service d'écoute des notifications système.
        </p>
      </div>

      <Card className="bg-brand-deep p-8 text-white relative overflow-hidden border-none rounded-[2rem]">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Smartphone className="w-32 h-32 rotate-12" />
        </div>
        
        <div className="relative z-10 space-y-8">
          <div className="w-14 h-14 bg-brand-cyan/20 rounded-2xl flex items-center justify-center text-brand-cyan shadow-lg shadow-black/20">
            <Fingerprint className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight">Sync Agent v2</h3>
            <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] mt-1">Service de fond inactif</p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">En attente d'approbation</span>
          </div>
        </div>
      </Card>

      <div className="space-y-5">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Guide Android</h4>
        <div className="space-y-4">
          {[
            "Menu Système > Confidentialité",
            "Accès spécial > Notifications",
            "Cochez l'application SwimPay"
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-4 text-sm font-black text-brand-deep dark:text-slate-200 tracking-tight group">
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-black text-slate-400 group-hover:bg-brand-light dark:group-hover:bg-brand-deep/20 group-hover:text-brand-teal transition-all">{i + 1}</div>
              {text}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6">
        <Button onClick={onNext} variant="primary">Continuer l'onboarding</Button>
      </div>
    </div>
  </MobileShell>
);

export const ChooseBanks = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => (
  <MobileShell title="Banques" onBack={onBack}>
    <div className="flex-1 flex flex-col gap-8 py-4">
      <Progress step={2} />
      
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-brand-deep dark:text-slate-100 tracking-tighter">Sources de signaux</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">Activez la détection sur vos comptes bancaires professionnels ou personnels.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[400px] pr-2 scrollbar-hide py-1">
        {MOCK_BANKS.map((bank) => (
          <label key={bank.id} className="cursor-pointer group block">
            <input type="checkbox" className="hidden peer" />
            <Card className="flex items-center gap-5 p-4 border-2 border-transparent peer-checked:border-brand-teal peer-checked:bg-white dark:peer-checked:bg-slate-900 shadow-soft transition-all hover:bg-slate-50 dark:hover:bg-slate-900/50">
              <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl p-2.5 shadow-premium border border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                <img src={bank.logo} alt={bank.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 peer-checked:grayscale-0 transition-all opacity-60 peer-checked:opacity-100" />
              </div>
              <div className="flex-1">
                <span className="font-black text-brand-deep dark:text-slate-100 tracking-tight block text-base">{bank.name}</span>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.2em] mt-1 block">Compatible Webhook</span>
              </div>
              <div className="w-7 h-7 border-2 border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center group-hover:border-slate-300 peer-checked:bg-brand-deep dark:peer-checked:bg-brand-cyan peer-checked:border-brand-deep dark:peer-checked:border-brand-cyan transition-all">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan dark:text-brand-deep opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
            </Card>
          </label>
        ))}
      </div>

      <div className="mt-auto">
        <Button onClick={onNext} variant="primary">Confirmer les sources</Button>
      </div>
    </div>
  </MobileShell>
);

export const AddReceivingMethod = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => (
  <MobileShell title="Business" onBack={onBack}>
    <div className="flex-1 flex flex-col gap-8 py-4">
      <Progress step={3} />
      
      <div className="space-y-3">
        <h2 className="text-3xl font-black text-brand-deep dark:text-slate-100 tracking-tighter">Profil Marchand</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed transition-colors">Définissez la structure légale de votre activité pour adapter les webhooks.</p>
      </div>

      <div className="flex flex-col gap-4">
        <label className="cursor-pointer">
          <input type="radio" name="biz_type" className="hidden peer" defaultChecked />
          <Card className="flex items-center gap-6 p-6 border-2 border-transparent peer-checked:border-brand-teal dark:peer-checked:border-brand-cyan peer-checked:bg-brand-light/30 dark:peer-checked:bg-brand-cyan/10 transition-all shadow-soft group">
            <div className="w-16 h-16 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center text-brand-teal dark:text-brand-cyan shadow-premium peer-checked:scale-105 transition-all">
              <User className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-xl text-brand-deep dark:text-slate-100 tracking-tighter transition-colors">Freelance</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-1 transition-colors">Utilisation via SBP téléphone ou virement nominatif classique.</p>
            </div>
          </Card>
        </label>

        <label className="cursor-pointer">
          <input type="radio" name="biz_type" className="hidden peer" />
          <Card className="flex items-center gap-6 p-6 border-2 border-transparent peer-checked:border-brand-teal dark:peer-checked:border-brand-cyan peer-checked:bg-brand-light/30 dark:peer-checked:bg-brand-cyan/10 transition-all shadow-soft group">
            <div className="w-16 h-16 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center text-slate-400 dark:text-slate-600 group-hover:text-brand-deep dark:group-hover:text-slate-200 peer-checked:text-brand-teal dark:peer-checked:text-brand-cyan shadow-premium peer-checked:scale-105 transition-all">
              <Building2 className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-xl text-slate-400 dark:text-slate-600 group-hover:text-brand-deep dark:group-hover:text-slate-200 peer-checked:text-brand-deep dark:peer-checked:text-slate-100 tracking-tighter transition-colors">Entreprise</h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 peer-checked:text-slate-500 dark:peer-checked:text-slate-400 font-medium leading-relaxed mt-1 transition-colors">Multi-utilisateurs, accès API complet et terminal illimité.</p>
            </div>
          </Card>
        </label>
      </div>

      <div className="p-6 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden flex items-center gap-5">
         <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-cyan shrink-0">
            <Landmark className="w-6 h-6" />
         </div>
         <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-cyan">Info SBP</h4>
            <p className="text-[11px] text-white/50 leading-relaxed font-medium mt-1">Le mode Freelance supporte l'envoi d'identifiants dynamiques par QR Code.</p>
         </div>
      </div>

      <div className="mt-auto">
        <Button onClick={onNext} variant="primary">Valider le profil</Button>
      </div>
    </div>
  </MobileShell>
);

export const VerifyConfig = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => (
  <MobileShell title="Signature" onBack={onBack}>
    <div className="flex-1 flex flex-col gap-8 py-4">
      <Progress step={4} />
      
      <div className="space-y-3">
        <h2 className="text-3xl font-black text-brand-deep dark:text-slate-100 tracking-tighter transition-colors">Policy Engine</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed transition-colors">
          Configurez l'intelligence de détection pour éviter les faux positifs et fraudes.
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-3">
           <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1 transition-colors">Vérification de donnée</label>
           <Card className="flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-soft rounded-3xl transition-colors">
              <span className="text-sm font-black text-brand-deep dark:text-slate-100 tracking-tight transition-colors">Référence Obligatoire</span>
              <div className="w-12 h-7 bg-brand-deep dark:bg-brand-cyan/20 rounded-full flex items-center px-1.5 shadow-inner transition-colors">
                <div className="w-4 h-4 bg-brand-cyan dark:bg-brand-cyan rounded-full translate-x-5 shadow-sm" />
              </div>
           </Card>
        </div>

        <div className="space-y-3">
           <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1 transition-colors">Algorithme de Confiance</label>
           <div className="grid grid-cols-2 gap-3">
              <button className="p-5 bg-brand-deep dark:bg-brand-cyan border-none rounded-3xl text-[10px] font-black uppercase tracking-widest text-brand-cyan dark:text-brand-deep shadow-xl shadow-brand-deep/10 dark:shadow-brand-cyan/20 transition-all">
                Humain (High)
              </button>
              <button className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-600 transition-all">
                AI (Expert)
              </button>
           </div>
        </div>
      </div>

      <div className="mt-6 flex-1 flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-cyan/5 to-transparent rounded-full blur-3xl opacity-50" />
        <div className="relative">
           <div className="w-40 h-40 bg-white rounded-[3rem] shadow-premium flex items-center justify-center text-brand-teal relative z-10">
              <div className="absolute inset-0 bg-brand-light rounded-[3rem] animate-ping opacity-20 scale-125" />
              <Zap className="w-16 h-16 fill-brand-teal/20" />
           </div>
           <div className="absolute -top-3 -right-3 bg-emerald-500 p-3 rounded-2xl border-4 border-[#F8FAFC] shadow-lg z-20">
              <CheckCircle2 className="w-6 h-6 text-white" />
           </div>
        </div>
      </div>

      <div className="mt-auto">
        <Button onClick={onNext} variant="primary">Finaliser le Link</Button>
      </div>
    </div>
  </MobileShell>
);

export const FinalizeSetup = ({ onNext }: { onNext: () => void, onBack: () => void }) => (
  <MobileShell showHeader={false}>
    <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-8">
      <Progress step={5} />
      
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        className="w-32 h-32 bg-brand-deep dark:bg-brand-cyan rounded-[3rem] flex items-center justify-center text-brand-cyan dark:text-brand-deep shadow-2xl shadow-brand-deep/20 dark:shadow-brand-cyan/20 mb-10 relative transition-all"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem]" />
        <CheckCircle2 className="w-14 h-14 stroke-[3px]" />
      </motion.div>

      <div className="space-y-4 mb-16">
        <h2 className="text-4xl font-black text-brand-deep dark:text-slate-100 tracking-tighter italic transition-colors">Prêt à <span className="text-brand-cyan">Scanner</span>.</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed px-4 transition-colors">
          Votre terminal marchand est synchronisé. Les paiements seront détectés en temps réel et transmis à votre webhook.
        </p>
      </div>

      <div className="w-full space-y-6">
        <Button onClick={onNext} variant="secondary" className="flex items-center justify-center gap-3 group shadow-2xl">
          Entrer dans le Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
        
        <div className="flex items-center gap-4 justify-center">
          <div className="w-1 h-1 bg-brand-cyan rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Terminal Synchronisé</span>
          <div className="w-1 h-1 bg-brand-cyan rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  </MobileShell>
);
