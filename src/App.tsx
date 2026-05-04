/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';

// Onboarding
import { Welcome, ConnectPhone, ChooseBanks, AddReceivingMethod, VerifyConfig, FinalizeSetup } from './features/merchant/onboarding/Screens';

// Dashboard & Merchant
import { Dashboard, ReceivingMethods } from './features/merchant/dashboard/Screens';
import { ReviewPayments, PaymentDetail } from './features/merchant/reviews/Screens';
import { OrdersList, ConnectedSite, Settings } from './features/merchant/DashboardExtended';
import { PhoneSettings, BankAccounts, SecurityCenter, HelpSupport, Conditions } from './features/merchant/settings/Screens';

import { Logo, Button } from './ui/components/Base';

// Dev Switcher Component
const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] flex flex-col items-center justify-center p-6 gap-12 gradient-mesh transition-colors duration-510">
      <div className="flex flex-col items-center gap-6 text-center">
        <Logo size="lg" className="flex-col !gap-3" />
        <div className="space-y-1">
          <h1 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">Merchant Terminal</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xs font-medium leading-relaxed">
            Transformez votre téléphone Android en un terminal de paiement sécurisé avec détection de signaux bancaires.
          </p>
        </div>
      </div>
      
      <div className="w-full max-w-sm flex flex-col gap-4">
        <Card onClick={() => navigate('/merchant/onboarding')} className="flex flex-col items-center gap-6 p-10 hover:border-brand-teal dark:hover:border-brand-cyan group cursor-pointer">
          <div className="p-5 bg-brand-deep dark:bg-brand-cyan rounded-[2rem] text-brand-cyan dark:text-brand-deep shadow-xl shadow-brand-deep/10 group-hover:scale-110 transition-transform duration-500">
             <ShoppingCart className="w-10 h-10" />
          </div>
          <div className="space-y-1 text-center">
            <span className="font-black text-xl text-brand-deep dark:text-slate-100 tracking-tight block">Terminal Vendeur</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Configuration Initiale</span>
          </div>
        </Card>
        
        <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-700">
          Sync Engine v2.4.1 • <span className="text-emerald-500">Live</span>
        </p>
      </div>
    </div>
  );
}

import { ThemeProvider } from './context/ThemeContext';
import { Card } from './ui/components/Base';
import { ShoppingCart } from 'lucide-react';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />

          {/* Merchant Onboarding Flow */}
          <Route path="/merchant/onboarding" element={<OnboardingFlow />} />
          
          {/* Merchant Dashboard Routes */}
          <Route path="/merchant/dashboard" element={<Dashboard />} />
          <Route path="/merchant/reviews" element={<ReviewPayments />} />
          <Route path="/merchant/reviews/:id" element={<MerchantPaymentDetailWrapper />} />
          <Route path="/merchant/orders" element={<OrdersList />} />
          <Route path="/merchant/receiving-methods" element={<SettingsDetailWrapper component={ReceivingMethods} />} />
          <Route path="/merchant/connected-site" element={<SettingsDetailWrapper component={ConnectedSite} />} />
          <Route path="/merchant/settings" element={<Settings />} />
          
          <Route path="/merchant/phone" element={<SettingsDetailWrapper component={PhoneSettings} />} />
          <Route path="/merchant/banks" element={<SettingsDetailWrapper component={BankAccounts} />} />
          <Route path="/merchant/security" element={<SettingsDetailWrapper component={SecurityCenter} />} />
          <Route path="/merchant/support" element={<SettingsDetailWrapper component={HelpSupport} />} />
          <Route path="/merchant/terms" element={<SettingsDetailWrapper component={Conditions} />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const OnboardingFlow = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const next = () => {
    if (step < 6) setStep(step + 1);
    else navigate('/merchant/dashboard');
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
    else navigate('/');
  };

  switch(step) {
    case 1: return <Welcome onNext={next} />;
    case 2: return <ConnectPhone onNext={next} onBack={back} />;
    case 3: return <ChooseBanks onNext={next} onBack={back} />;
    case 4: return <AddReceivingMethod onNext={next} onBack={back} />;
    case 5: return <VerifyConfig onNext={next} onBack={back} />;
    case 6: return <FinalizeSetup onNext={next} onBack={back} />;
    default: return <Welcome onNext={next} />;
  }
};

const MerchantPaymentDetailWrapper = () => {
  const navigate = useNavigate();
  return <PaymentDetail onBack={() => navigate('/merchant/reviews')} />;
}

const SettingsDetailWrapper = ({ component: Component }: { component: any }) => {
  const navigate = useNavigate();
  return <Component onBack={() => navigate('/merchant/settings')} />;
}

