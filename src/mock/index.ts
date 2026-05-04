export const MOCK_BANKS = [
  { id: 'sberbank', name: 'Sberbank', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Sberbank_Logo_2020.svg' },
  { id: 'tbank', name: 'T-Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/T-Bank_Symbol.svg/1024px-T-Bank_Symbol.svg.png' },
  { id: 'vtb', name: 'VTB', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Vtb_symbol.svg' },
  { id: 'alfa', name: 'Alfa-Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Alfa-Bank_Logo.svg/2560px-Alfa-Bank_Logo.svg.png' },
  { id: 'gazprom', name: 'Gazprombank', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Gazprombank_Logo.svg/1280px-Gazprombank_Logo.svg.png' },
];

export const MOCK_PAYMENTS = [
  {
    id: 'p1',
    amount: '58,41',
    currency: '₽',
    bank: 'Sberbank',
    status: 'pending_review',
    time: 'Il y a 2 min',
    reference: 'TANGO ALFA',
  },
  {
    id: 'p2',
    amount: '129,00',
    currency: '₽',
    bank: 'T-Bank',
    status: 'pending_review',
    time: 'Il y a 8 min',
    reference: 'Référence non visible',
  },
  {
    id: 'p3',
    amount: '45,00',
    currency: '₽',
    bank: 'Alfa-Bank',
    status: 'validated',
    time: 'Il y a 12 min',
    reference: 'Paiement détecté',
    method: 'manual',
  },
];

export const MOCK_ORDERS = [
  { id: 'ord_123', amount: '58,41', status: 'confirmé', customer: 'Client #12', date: 'Aujourd\'hui, 14:20' },
  { id: 'ord_124', amount: '129,00', status: 'en_attente', customer: 'Client #13', date: 'Aujourd\'hui, 14:15' },
];
