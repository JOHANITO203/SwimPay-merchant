import { useNavigate } from 'react-router-dom';
import { DashboardShell } from './DashboardShell';
import { Logo } from '@/src/ui/components/Base';
import { MOCK_ORDERS } from '@/src/mock';
import {
  Box,
  Typography,
  Card as MuiCard,
  Grid,
  IconButton,
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
  TextField,
  InputAdornment,
  AppBar,
  Toolbar,
  Divider,
} from '@mui/material';
import {
  Search,
  FilterList,
  ShoppingCart,
  ChevronRight,
  Terminal,
  CheckCircle,
  VpnKey,
  KeyRounded,
  History,
  CodeRounded,
  Share,
  Settings as SettingsIcon,
  PhoneIphone,
  CreditCard,
  AccountBalance,
  Security,
  Help,
  Description,
  Logout,
  ArrowBackIosNew,
  Bolt
} from '@mui/icons-material';

export const OrdersList = () => {
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();

  return (
    <DashboardShell activeTab="orders">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, pb: 4 }}>
        <Box>
          <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
            Ventes & Commandes
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontWeight: 500 }}>
            Historique des transactions e-commerce synchronisées.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            placeholder="ID, Client, Montant..."
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 4, bgcolor: 'background.paper' }
              }
            }}
          />
          <IconButton sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
            <FilterList />
          </IconButton>
        </Box>

        <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {MOCK_ORDERS.map((o) => (
            <ListItem 
              key={o.id} 
              disablePadding 
              sx={{ bgcolor: 'background.paper', borderRadius: 4, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}
            >
              <ListItemButton sx={{ p: 2, alignItems: 'center', gap: 1 }}>
                <ListItemAvatar>
                  <Avatar variant="rounded" sx={{ width: 56, height: 56, bgcolor: alpha(muiTheme.palette.primary.main, 0.05), color: 'primary.main' }}>
                    <ShoppingCart />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  slotProps={{
                    primary: { component: 'div' },
                    secondary: { component: 'div' }
                  }}
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em' }}>{o.id}</Typography>
                      <Typography sx={{ fontWeight: 800 }}>{o.amount} ₽</Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>{o.customer} • {o.date}</Typography>
                      <Chip 
                        label={o.status} 
                        size="small" 
                        sx={{ 
                          height: 18, 
                          fontSize: '0.6rem', 
                          fontWeight: 800, 
                          textTransform: 'uppercase',
                          bgcolor: o.status === 'confirmé' ? alpha('#146c2e', 0.1) : alpha('#b3261e', 0.1),
                          color: o.status === 'confirmé' ? '#146c2e' : '#b3261e',
                          borderRadius: 1
                        }} 
                      />
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </DashboardShell>
  );
};

export const ConnectedSite = ({ onBack }: { onBack?: () => void }) => {
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();

  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, pb: 6 }}>
      <Box sx={{ px: 0.5 }}>
        <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
          Intégration API
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
          Connectez votre infrastructure backend pour automatiser la validation des commandes.
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 4, borderRadius: 6, bgcolor: 'primary.main', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <Terminal sx={{ position: 'absolute', top: 20, right: 20, fontSize: 100, opacity: 0.1, transform: 'rotate(15deg)' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Avatar sx={{ bgcolor: alpha('#fff', 0.2), color: 'white' }}>
            <CheckCircle />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem' }}>Endpoint Actif</Typography>
            <Typography variant="caption" sx={{ opacity: 0.6, fontWeight: 700, textTransform: 'uppercase' }}>Connecté depuis 42 jours</Typography>
          </Box>
        </Box>
        <Divider sx={{ borderColor: alpha('#fff', 0.1), mb: 3 }} />
        <Box>
          <Typography variant="caption" sx={{ opacity: 0.6, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Webhook URL</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, p: 2, bgcolor: alpha('#fff', 0.05), borderRadius: 2, border: '1px solid', borderColor: alpha('#fff', 0.1) }}>
             <Typography sx={{ 
                flex: 1, 
                fontSize: '0.75rem', 
                fontFamily: 'monospace',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>https://api.business.com/v1/swimpay/</Typography>
             <IconButton size="small" sx={{ color: 'white', opacity: 0.7 }}><VpnKey sx={{ fontSize: 16 }} /></IconButton>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {[
          { label: 'Tester Webhook', desc: 'Simulation événement de paiement.', icon: Bolt, color: muiTheme.palette.primary.main },
          { label: 'Merchant Secret', desc: 'Clé de signature HMAC-SHA256.', icon: KeyRounded, color: '#f59e0b' },
          { label: 'Logs de Trafic', desc: 'Historique des requêtes HTTP.', icon: History, color: 'text.secondary' }
        ].map((item, i) => (
          <MuiCard key={i} sx={{ borderRadius: 4 }}>
            <MuiButton fullWidth sx={{ p: 2.5, justifyContent: 'flex-start', textTransform: 'none', color: 'text.primary', gap: 2 }}>
              <Avatar variant="rounded" sx={{ bgcolor: alpha(item.color as string, 0.1), color: item.color }}>
                <item.icon />
              </Avatar>
              <Box sx={{ flex: 1, textAlign: 'left' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{item.label}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>{item.desc}</Typography>
              </Box>
              <ChevronRight sx={{ opacity: 0.2 }} />
            </MuiButton>
          </MuiCard>
        ))}
      </Box>

      <MuiButton 
        fullWidth 
        variant="outlined" 
        startIcon={<CodeRounded />} 
        sx={{ borderRadius: 4, py: 1.5, fontWeight: 700 }}
      >
        Documentation API
      </MuiButton>
    </Box>
  );

  if (onBack) {
    return (
      <Box sx={{ bgcolor: 'background.paper', minHeight: '100vh', width: '100%', maxWidth: '450px', mx: 'auto' }}>
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', color: 'text.primary' }}>
          <Toolbar sx={{ gap: 2 }}>
            <IconButton onClick={onBack} size="small"><ArrowBackIosNew sx={{ fontSize: 18 }} /></IconButton>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Sync Engine</Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 3 }}>{content}</Box>
      </Box>
    );
  }

  return <DashboardShell activeTab="more">{content}</DashboardShell>;
};

export const Settings = () => {
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  
  return (
    <DashboardShell activeTab="more">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, pb: 10 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, pt: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar 
              sx={{ 
                width: 96, 
                height: 96, 
                bgcolor: 'primary.main', 
                borderRadius: 6,
                boxShadow: `0 8px 24px ${alpha(muiTheme.palette.primary.main, 0.25)}`
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 900 }}>JD</Typography>
            </Avatar>
            <IconButton 
              sx={{ 
                position: 'absolute', 
                bottom: -8, 
                right: -8, 
                bgcolor: 'background.paper', 
                boxShadow: 2,
                '&:hover': { bgcolor: 'background.paper' }
              }}
              size="small"
            >
              <Share sx={{ fontSize: 16, color: 'primary.main' }} />
            </IconButton>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>Terminal Marchand</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: '0.1em' }}>UID: #7114-4466-8301</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <SettingsSection 
            title="Infrastructure"
            items={[
               { label: 'Paramètres Android', icon: PhoneIphone, path: '/merchant/phone' },
               { label: 'Canaux de Paiement', icon: CreditCard, path: '/merchant/receiving-methods' },
               { label: 'Comptes Bancaires', icon: AccountBalance, path: '/merchant/banks' },
               { label: 'Développeur & API', icon: Terminal, path: '/merchant/connected-site' },
            ]}
            onNavigate={navigate}
          />

          <SettingsSection 
            title="Support & Sécurité"
            items={[
               { label: 'Centre de Sécurité', icon: Security, path: '/merchant/security' },
               { label: 'Aide & Assistance', icon: Help, path: '/merchant/support' },
               { label: 'Conditions Générales', icon: Description, path: '/merchant/terms' },
            ]}
            onNavigate={navigate}
          />

          <MuiButton 
            fullWidth 
            onClick={() => navigate('/')}
            sx={{ 
              py: 2, 
              color: 'error.main', 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              letterSpacing: '0.2em',
              fontSize: '0.7rem',
              opacity: 0.6,
              '&:hover': { opacity: 1, bgcolor: 'error.lighter' }
            }}
            startIcon={<Logout />}
          >
            Se Déconnecter
          </MuiButton>
        </Box>
      </Box>
    </DashboardShell>
  );
};

const SettingsSection = ({ title, items, onNavigate }: any) => {
  const muiTheme = useMuiTheme();
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', ml: 1, mb: 1.5, display: 'block' }}>
        {title}
      </Typography>
      <Paper sx={{ borderRadius: 6, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }} elevation={0}>
        <List disablePadding>
          {items.map((item: any, i: number) => (
            <Box key={i}>
              <ListItem 
                disablePadding
              >
                <ListItemButton
                  sx={{ p: 2.5, justifyContent: 'flex-start', color: 'text.primary', gap: 2.5 }}
                  onClick={() => onNavigate(item.path)}
                >
                  <Avatar variant="rounded" sx={{ width: 44, height: 44, bgcolor: alpha(muiTheme.palette.text.secondary, 0.05), color: 'text.secondary' }}>
                    <item.icon sx={{ fontSize: 22 }} />
                  </Avatar>
                  <Typography sx={{ flex: 1, fontWeight: 700 }}>{item.label}</Typography>
                  <ChevronRight sx={{ opacity: 0.2 }} />
                </ListItemButton>
              </ListItem>
              {i < items.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  );
};
