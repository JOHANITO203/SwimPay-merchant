import { useNavigate } from 'react-router-dom';
import { DashboardShell } from '../DashboardShell';
import { MOCK_PAYMENTS, MOCK_BANKS } from '@/src/mock';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/src/context/ThemeContext';
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
  ListItemAvatar,
  ListItemText,
  Paper,
  alpha,
  useTheme as useMuiTheme,
  LinearProgress
} from '@mui/material';
import {
  CalendarMonth,
  TrendingUp,
  ArrowForwardIos,
  Visibility,
  CheckCircle,
  AccountBalance,
  Add,
  PhoneIphone,
  CreditCard,
  ArrowBackIosNew,
  Security
} from '@mui/icons-material';

const CHART_DATA = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 600 },
  { name: 'Thu', value: 800 },
  { name: 'Fri', value: 500 },
  { name: 'Sat', value: 900 },
  { name: 'Sun', value: 700 },
];

const StatCard = ({ icon, label, value, trend }: any) => {
  const muiTheme = useMuiTheme();
  return (
    <MuiCard sx={{ p: 3, borderRadius: 5, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ color: 'primary.main', display: 'flex' }}>
        {icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>{value}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5, alignItems: 'flex-end' }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{label}</Typography>
          {trend && <Typography variant="caption" sx={{ fontWeight: 800, color: 'success.main', ml: 'auto' }}>{trend}</Typography>}
        </Box>
      </Box>
    </MuiCard>
  );
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  
  return (
    <DashboardShell activeTab="dashboard">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h2" color="text.primary" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
              Vue d'ensemble
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', mt: 0.5 }}>
              Terminal de paiement actif
            </Typography>
          </Box>
          <IconButton sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 4 }}>
            <CalendarMonth color="primary" />
          </IconButton>
        </Box>
        
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 6,
            bgcolor: 'primary.main',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 12px 30px rgba(11, 87, 208, 0.2)',
          }}
        >
          <Box sx={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(40px)' }} />
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
              <Chip
                icon={<TrendingUp sx={{ fontSize: '1rem !important', color: 'primary.main !important' }} />}
                label="Activité Mensuelle"
                size="small"
                sx={{ bgcolor: alpha('#fff', 0.9), color: 'primary.main', fontWeight: 700, borderRadius: 2 }}
              />
              <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Live Feed
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <Typography variant="h1" sx={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
                  1 482 000
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, opacity: 0.8 }}>₽</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#4ade80' }}>+12.5%</Typography>
                <Typography variant="caption" sx={{ opacity: 0.6, fontWeight: 500 }}>vs mois précédent</Typography>
              </Box>
            </Box>

            <LinearProgress 
              variant="determinate" 
              value={70} 
              sx={{ 
                height: 6, 
                borderRadius: 3, 
                bgcolor: alpha('#fff', 0.2),
                '& .MuiLinearProgress-bar': { bgcolor: alpha('#fff', 0.8) }
              }} 
            />
          </Box>
        </Paper>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <StatCard icon={<Visibility />} label="À vérifier" value="7" trend="+2 new" />
          </Grid>
          <Grid item xs={6}>
            <StatCard icon={<CheckCircle />} label="Validés" value="24" trend="+84%" />
          </Grid>
          
          <Grid item xs={12}>
            <MuiCard sx={{ p: 4, borderRadius: 6 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 2 }}>
                Tendances des paiements
              </Typography>
              <Box sx={{ height: 200, width: '100%', ml: -2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHART_DATA}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={muiTheme.palette.primary.main} stopOpacity={0.2}/>
                        <stop offset="95%" stopColor={muiTheme.palette.primary.main} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={muiTheme.palette.divider} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: muiTheme.palette.text.secondary }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: muiTheme.shadows[3], backgroundColor: muiTheme.palette.background.paper }} />
                    <Area type="monotone" dataKey="value" stroke={muiTheme.palette.primary.main} strokeWidth={3} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </MuiCard>
          </Grid>
        </Grid>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, px: 1 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Paiements Récents
            </Typography>
            <MuiButton size="small" onClick={() => navigate('/merchant/reviews')} sx={{ fontWeight: 700 }}>Voir tout</MuiButton>
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
                  <MuiButton fullWidth sx={{ p: 2, justifyContent: 'flex-start', textTransform: 'none', color: 'text.primary' }} onClick={() => navigate(`/merchant/reviews/${p.id}`)}>
                    <ListItemAvatar>
                      <Avatar variant="rounded" src={bankLogo} sx={{ width: 48, height: 48, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', p: 1 }}>
                        <AccountBalance />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography sx={{ fontWeight: 800, fontSize: '1.125rem' }}>{p.amount} {p.currency}</Typography>}
                      secondary={<Typography variant="caption" color="text.secondary">{p.bank} • {p.time}</Typography>}
                    />
                    <ArrowForwardIos sx={{ fontSize: 14, opacity: 0.3 }} />
                  </MuiButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </DashboardShell>
  );
};

export const ReceivingMethods = ({ onBack }: { onBack?: () => void }) => {
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();

  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, pb: 4 }}>
      <Box sx={{ px: 0.5 }}>
        <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
          Canaux de réception
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
          Gérez vos identifiants bancaires et portefeuilles SBP configurés sur ce terminal.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MuiButton
            fullWidth
            variant="outlined"
            sx={{ flexDirection: 'column', py: 3, gap: 1, borderRadius: 6, borderStyle: 'dashed' }}
          >
            <Avatar sx={{ bgcolor: alpha(muiTheme.palette.primary.main, 0.1), color: 'primary.main' }}>
              <CreditCard />
            </Avatar>
            <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ajouter Carte</Typography>
          </MuiButton>
        </Grid>
        <Grid item xs={6}>
          <MuiButton
            fullWidth
            variant="outlined"
            sx={{ flexDirection: 'column', py: 3, gap: 1, borderRadius: 6, borderStyle: 'dashed' }}
          >
            <Avatar sx={{ bgcolor: alpha(muiTheme.palette.primary.main, 0.1), color: 'primary.main' }}>
              <PhoneIphone />
            </Avatar>
            <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ajouter Mobile</Typography>
          </MuiButton>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {[
          { type: 'card', name: 'Sberbank Platinum', id: '• • • • 4821', icon: CreditCard },
          { type: 'phone', name: 'T-Bank Business', id: '+7 * * * 45-67', icon: PhoneIphone }
        ].map((method) => {
          const bankLogo = MOCK_BANKS.find(b => method.name.includes(b.name))?.logo;
          return (
            <MuiCard key={method.id} sx={{ borderRadius: 6, overflow: 'hidden' }}>
              <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar variant="rounded" src={bankLogo} sx={{ width: 56, height: 56, p: 1, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
                   <AccountBalance />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{method.name}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{method.id}</Typography>
                </Box>
                <Chip size="small" label="Actif" color="success" sx={{ height: 20, fontSize: '0.625rem', fontWeight: 800 }} />
              </Box>
              <Paper square elevation={0} sx={{ display: 'flex', borderTop: '1px solid', borderColor: 'divider', bgcolor: alpha(muiTheme.palette.background.default, 0.5) }}>
                <MuiButton fullWidth sx={{ borderRadius: 0, py: 1.5, color: 'text.secondary' }}>Modifier</MuiButton>
                <Divider orientation="vertical" flexItem />
                <MuiButton fullWidth sx={{ borderRadius: 0, py: 1.5, color: 'text.secondary' }}>Pause</MuiButton>
              </Paper>
            </MuiCard>
          );
        })}
      </Box>

      <Paper sx={{ p: 3, borderRadius: 6, bgcolor: alpha(muiTheme.palette.text.primary, 0.05), border: 'none', display: 'flex', alignItems: 'center', gap: 3 }}>
        <Avatar sx={{ bgcolor: 'text.primary', color: 'background.paper' }}>
          <Security />
        </Avatar>
        <Box>
           <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>Confidentialité</Typography>
           <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>Vos données sont stockées localement. Aucun identifiant complet ne quitte ce terminal.</Typography>
        </Box>
      </Paper>
    </Box>
  );

  if (onBack) {
    return (
      <Box sx={{ bgcolor: 'background.paper', minHeight: '100vh', width: '100%', maxWidth: '450px', mx: 'auto' }}>
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', color: 'text.primary' }}>
          <Toolbar sx={{ gap: 2 }}>
            <IconButton onClick={onBack} size="small">
              <ArrowBackIosNew sx={{ fontSize: 18 }} />
            </IconButton>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Canaux</Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 3 }}>{content}</Box>
      </Box>
    );
  }

  return <DashboardShell activeTab="more">{content}</DashboardShell>;
};

import { Divider } from '@mui/material';
