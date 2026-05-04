import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardShell } from '../DashboardShell';
import { MOCK_PAYMENTS, MOCK_BANKS } from '@/src/mock';
import {
  Box,
  Typography,
  Card as MuiCard,
  Tabs,
  Tab,
  Avatar,
  Chip,
  Button as MuiButton,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Paper,
  alpha,
  useTheme as useMuiTheme,
  IconButton,
  AppBar,
  Toolbar,
  Divider,
} from '@mui/material';
import {
  GridView,
  History,
  CheckCircle,
  Cancel,
  ArrowForwardIos,
  AccountBalance,
  Search,
  VerifiedUser,
  Fingerprint,
  Info,
  ArrowBackIosNew,
  Warning,
  Visibility,
  AccountBalanceWallet,
  Terminal,
  Schedule
} from '@mui/icons-material';

export const ReviewPayments = () => {
  const [filter, setFilter] = useState(1); // 1 = review
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const muiTheme = useMuiTheme();
  
  const filters = [
    { id: 0, label: 'Tout', icon: <GridView fontSize="small" /> },
    { id: 1, label: 'Vérification', icon: <History fontSize="small" /> },
    { id: 2, label: 'Conformes', icon: <CheckCircle fontSize="small" /> },
    { id: 3, label: 'Rejetés', icon: <Cancel fontSize="small" /> },
  ];

  if (selectedPayment) {
    return <PaymentDetail pId={selectedPayment} onBack={() => setSelectedPayment(null)} />;
  }

  return (
    <DashboardShell activeTab="reviews">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, pb: 4 }}>
        <Box>
          <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
            Signalements Reçus
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontWeight: 500 }}>
            Confirmez les paiements détectés par votre terminal Android.
          </Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', overflow: 'auto' }}>
          <Tabs 
            value={filter} 
            onChange={(_, val) => setFilter(val)} 
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              minHeight: 48,
              '& .MuiTab-root': { textTransform: 'none', fontWeight: 700, fontSize: '0.875rem' }
            }}
          >
            {filters.map((f) => (
              <Tab 
                key={f.id} 
                icon={f.icon} 
                iconPosition="start" 
                label={f.label} 
                sx={{ borderRadius: 2, mr: 1 }}
              />
            ))}
          </Tabs>
        </Box>

        <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {MOCK_PAYMENTS.map((p) => {
             const bankLogo = MOCK_BANKS.find(b => b.name === p.bank)?.logo;
             return (
              <ListItem 
                key={p.id} 
                disablePadding 
                sx={{ bgcolor: 'background.paper', borderRadius: 4, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}
              >
                <ListItemButton 
                  onClick={() => setSelectedPayment(p.id)}
                  sx={{ p: 3, flexDirection: 'column', alignItems: 'stretch', color: 'text.primary' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar variant="rounded" src={bankLogo} sx={{ width: 48, height: 48, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', p: 1 }}>
                      <AccountBalance />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>{p.amount} {p.currency}</Typography>
                        <Chip 
                          label={p.status} 
                          size="small" 
                          sx={{ 
                            height: 18, 
                            fontSize: '0.6rem', 
                            fontWeight: 800, 
                            textTransform: 'uppercase',
                            bgcolor: p.status === 'validated' ? alpha('#146c2e', 0.1) : alpha('#f59e0b', 0.1),
                            color: p.status === 'validated' ? '#146c2e' : '#92400e',
                          }} 
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{p.bank}</Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip label={p.time} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.6rem', fontWeight: 700 }} />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {p.status === 'pending_review' ? <Search sx={{ fontSize: 14, color: 'warning.main' }} /> : <VerifiedUser sx={{ fontSize: 14, color: 'success.main' }} />}
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.65rem' }}>
                          {p.status === 'pending_review' ? 'Validation requise' : 'Signaux cohérents'}
                        </Typography>
                      </Box>
                    </Box>
                    <ArrowForwardIos sx={{ fontSize: 12, opacity: 0.2 }} />
                  </Box>
                </ListItemButton>
              </ListItem>
             );
          })}
        </List>
      </Box>
    </DashboardShell>
  );
};

export const PaymentDetail = ({ pId = 'p1', onBack }: { pId?: string, onBack: () => void }) => {
  const p = MOCK_PAYMENTS.find(x => x.id === pId) || MOCK_PAYMENTS[0];
  const bankLogo = MOCK_BANKS.find(b => b.name === p.bank)?.logo;
  const muiTheme = useMuiTheme();
  
  const detailItems = [
    { label: 'Montant Saisi', value: `${p.amount} ${p.currency}`, icon: <GridView /> },
    { label: 'Montant Reçu', value: `${p.amount} ${p.currency}`, icon: <Visibility /> },
    { label: 'Émetteur', value: 'Ivan P.', icon: <Fingerprint /> },
    { label: 'Banque Destination', value: p.bank, icon: <AccountBalanceWallet /> },
    { label: 'ID Transaction', value: p.reference, icon: <Terminal /> },
    { label: 'Capture Horloge', value: p.time, icon: <Schedule /> },
  ];

  return (
    <Box sx={{ bgcolor: 'background.paper', minHeight: '100vh', width: '100%', maxWidth: '450px', mx: 'auto' }}>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', color: 'text.primary' }}>
        <Toolbar sx={{ gap: 2 }}>
          <IconButton onClick={onBack} size="small"><ArrowBackIosNew sx={{ fontSize: 18 }} /></IconButton>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Inspection Signal</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Avatar 
            src={bankLogo} 
            sx={{ 
              width: 96, 
              height: 96, 
              bgcolor: 'background.default', 
              border: '1px solid', 
              borderColor: 'divider',
              p: 2,
              borderRadius: 6
            }}
          >
             <AccountBalance sx={{ fontSize: 40 }} />
          </Avatar>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>{p.amount} <Typography component="span" variant="h3" color="primary.main" sx={{ fontWeight: 900 }}>₽</Typography></Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vérification Manuelle</Typography>
          </Box>
        </Box>

        <Paper elevation={0} sx={{ p: 3, borderRadius: 6, bgcolor: alpha(muiTheme.palette.warning.main, 0.05), border: '1px solid', borderColor: alpha(muiTheme.palette.warning.main, 0.1), display: 'flex', gap: 2 }}>
           <Avatar sx={{ bgcolor: 'warning.main', color: 'white' }}><Warning /></Avatar>
           <Box>
             <Typography variant="subtitle2" color="warning.dark" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Alerte Détectée</Typography>
             <Typography variant="caption" color="warning.dark" sx={{ fontWeight: 500, lineHeight: 1.5, display: 'block', mt: 0.5 }}>
               Le système a détecté un virement entrant, mais la référence ne correspond pas exactement à la commande #4812.
             </Typography>
           </Box>
        </Paper>

        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', ml: 1, mb: 1, display: 'block' }}>Preuves & Données</Typography>
          <Paper sx={{ borderRadius: 6, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }} elevation={0}>
            <List disablePadding>
              {detailItems.map((item, i) => (
                <Box key={i}>
                  <ListItem sx={{ py: 2, gap: 2 }}>
                    <Avatar variant="rounded" sx={{ width: 36, height: 36, bgcolor: 'background.default', color: 'text.secondary', fontSize: 18 }}>
                       {item.icon}
                    </Avatar>
                    <ListItemText 
                      slotProps={{
                        primary: { component: 'div' },
                        secondary: { component: 'div' }
                      }}
                      primary={<Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>{item.label}</Typography>}
                      secondary={<Typography sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.875rem' }}>{item.value}</Typography>}
                    />
                  </ListItem>
                  {i < detailItems.length - 1 && <Divider sx={{ ml: 8 }} />}
                </Box>
              ))}
            </List>
          </Paper>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 4 }}>
          <MuiButton 
            fullWidth 
            variant="contained" 
            startIcon={<CheckCircle />}
            sx={{ py: 2, borderRadius: 4, fontWeight: 700 }}
          >
            Confirmer & Valider
          </MuiButton>
          <MuiButton 
            fullWidth 
            variant="outlined" 
            color="error"
            startIcon={<Cancel />}
            sx={{ py: 2, borderRadius: 4, fontWeight: 700, borderStyle: 'dashed' }}
          >
            Rejeter comme faux
          </MuiButton>
          <Box sx={{ display: 'flex', gap: 1, px: 2, mt: 1 }}>
            <Info sx={{ fontSize: 14, color: 'text.secondary', mt: 0.2 }} />
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, textAlign: 'center', lineHeight: 1.4 }}>
              La validation manuelle impacte instantanément le webhook envoyé au marchand.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
