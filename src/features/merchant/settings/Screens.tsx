import { useNavigate } from 'react-router-dom';
import { MOCK_BANKS } from '@/src/mock';
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
  AppBar,
  Toolbar,
  Divider,
  Switch,
} from '@mui/material';
import {
  Smartphone,
  Shield,
  Help,
  Description,
  ArrowBackIosNew,
  NotificationsActive,
  BatteryChargingFull,
  AutoMode,
  AccountBalance,
  Add,
  ChevronRight,
  Lock,
  Fingerprint,
  Article,
  Warning,
  Send,
  Storage,
  Lan
} from '@mui/icons-material';

// --- WRAPPER FOR UNDER-DASHBOARD SCREENS ---
const SettingsPageShell = ({ title, onBack, children }: any) => (
  <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', width: '100%', maxWidth: '450px', mx: 'auto' }}>
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', color: 'text.primary' }}>
      <Toolbar sx={{ gap: 2 }}>
        <IconButton onClick={onBack} size="small">
          <ArrowBackIosNew sx={{ fontSize: 18 }} />
        </IconButton>
        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{title}</Typography>
      </Toolbar>
    </AppBar>
    <Box sx={{ p: 3 }}>{children}</Box>
  </Box>
);

export const PhoneSettings = ({ onBack }: { onBack: () => void }) => {
  const muiTheme = useMuiTheme();
  return (
    <SettingsPageShell title="Paramètres Android" onBack={onBack}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, pt: 2 }}>
          <Avatar 
            sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: 'primary.main', 
              borderRadius: 5,
              boxShadow: `0 8px 24px ${alpha(muiTheme.palette.primary.main, 0.2)}`
            }}
          >
            <Smartphone sx={{ fontSize: 40 }} />
          </Avatar>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>Sync Agent v2.4</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: '0.1em' }}>ID: #TERM-8821</Typography>
          </Box>
        </Box>

        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            borderRadius: 4, 
            bgcolor: alpha('#4ade80', 0.1), 
            border: '1px solid', 
            borderColor: alpha('#4ade80', 0.2),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#22c55e', animation: 'pulse 2s infinite' }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#166534' }}>Service Actif</Typography>
          </Box>
          <Chip label="Connecté" size="small" sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.6rem', bgcolor: '#22c55e', color: 'white' }} />
        </Paper>

        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', ml: 1, mb: 1.5, display: 'block' }}>Config Agent</Typography>
          <Paper sx={{ borderRadius: 6, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }} elevation={0}>
             <List disablePadding>
                {[
                  { label: 'Lecture SMS', icon: NotificationsActive, active: true },
                  { label: 'Gestion Énergie', icon: BatteryChargingFull, active: false },
                  { label: 'Auto-Démarrage', icon: AutoMode, active: true },
                ].map((item, i) => (
                  <Box key={i}>
                    <ListItem sx={{ py: 2, px: 2.5 }}>
                      <ListItemAvatar>
                        <Avatar variant="rounded" sx={{ bgcolor: alpha(muiTheme.palette.primary.main, 0.05), color: 'primary.main', width: 40, height: 40 }}>
                           <item.icon sx={{ fontSize: 20 }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={<Typography sx={{ fontWeight: 700 }}>{item.label}</Typography>} />
                      <Switch defaultChecked={item.active} size="small" />
                    </ListItem>
                    {i < 2 && <Divider sx={{ ml: 8 }} />}
                  </Box>
                ))}
             </List>
          </Paper>
        </Box>

        <MuiButton fullWidth color="error" variant="text" sx={{ py: 2, fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.1em' }}>Réinitialiser le terminal</MuiButton>
      </Box>
    </SettingsPageShell>
  );
};

export const BankAccounts = ({ onBack }: { onBack: () => void }) => {
  const muiTheme = useMuiTheme();
  return (
    <SettingsPageShell title="Comptes Bancaires" onBack={onBack}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box>
          <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>Sources Connectées</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
             Les comptes bancaires dont les notifications sont interceptées par le terminal.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {MOCK_BANKS.slice(0, 3).map((bank, i) => (
            <MuiCard key={bank.id} sx={{ borderRadius: 5, border: '1px solid', borderColor: 'divider' }} elevation={0}>
              <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar 
                   variant="rounded" 
                   src={bank.logo} 
                   sx={{ width: 56, height: 56, p: 1, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}
                >
                  <AccountBalance />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{bank.name}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Vérification SBP Active</Typography>
                </Box>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: i === 2 ? 'warning.main' : 'success.main' }} />
              </Box>
            </MuiCard>
          ))}
        </Box>

        <MuiButton 
          fullWidth 
          variant="contained" 
          startIcon={<Add />} 
          sx={{ py: 2, borderRadius: 4, fontWeight: 700 }}
        >
          Lier un compte bancaire
        </MuiButton>
      </Box>
    </SettingsPageShell>
  );
};

export const SecurityCenter = ({ onBack }: { onBack: () => void }) => {
  const muiTheme = useMuiTheme();
  return (
    <SettingsPageShell title="Sécurité" onBack={onBack}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            borderRadius: 6, 
            bgcolor: 'primary.main', 
            color: 'white', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, bgcolor: 'white', opacity: 0.05, borderRadius: '50%' }} />
          <Avatar sx={{ width: 64, height: 64, bgcolor: alpha('#fff', 0.15), color: 'white' }}>
            <Shield sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>Coffre-Fort Chiffré</Typography>
            <Typography variant="caption" sx={{ opacity: 0.6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Signal Intègre • HMAC-SHA256</Typography>
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
           {[
             { label: 'Accès Biométrique', desc: 'FaceID / Empreinte requis.', icon: Fingerprint, status: 'Actif', color: '#146c2e' },
             { label: 'Rotation des Clés', desc: 'Renouvellement auto.', icon: Lock, status: '30j', color: muiTheme.palette.primary.main },
             { label: 'Sessions Actives', desc: 'Gérez vos terminaux.', icon: Lan, status: '1', color: 'text.secondary' },
           ].map((item, i) => (
             <MuiCard key={i} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }} elevation={0}>
               <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2.5 }}>
                 <Avatar variant="rounded" sx={{ bgcolor: alpha(item.color as string, 0.05), color: item.color as string }}>
                    <item.icon />
                 </Avatar>
                 <Box sx={{ flex: 1 }}>
                   <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{item.label}</Typography>
                   <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>{item.desc}</Typography>
                 </Box>
                 <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>{item.status}</Typography>
               </Box>
             </MuiCard>
           ))}
        </Box>
      </Box>
    </SettingsPageShell>
  );
};

export const HelpSupport = ({ onBack }: { onBack: () => void }) => {
  const muiTheme = useMuiTheme();
  return (
    <SettingsPageShell title="Support" onBack={onBack}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box>
          <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>Assistance</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
             Consultez nos ressources ou parlez à un expert technique.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { label: 'Base de connaissances', icon: Article, desc: 'Guides et tutos.' },
            { label: 'Latence Réseau', icon: Storage, desc: 'État des passerelles.' },
            { label: 'Historique Tickets', icon: Send, desc: 'Vos demandes.' },
          ].map((item, i) => (
            <MuiCard key={i} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }} elevation={0}>
               <MuiButton fullWidth sx={{ p: 2.5, justifyContent: 'flex-start', textTransform: 'none', color: 'text.primary', gap: 2.5 }}>
                  <Avatar sx={{ bgcolor: alpha(muiTheme.palette.primary.main, 0.05), color: 'primary.main' }}>
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

        <Paper elevation={0} sx={{ p: 4, borderRadius: 6, bgcolor: alpha(muiTheme.palette.text.primary, 0.03), textAlign: 'center', gap: 2, display: 'flex', flexDirection: 'column' }}>
           <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Besoin d'aide immédiate ?</Typography>
           <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              Nos techniciens répondent en moins de 15 minutes sur notre canal Telegram officiel.
           </Typography>
           <MuiButton variant="outlined" sx={{ mt: 1, borderRadius: 3, fontWeight: 700 }}>Contacter sur Telegram</MuiButton>
        </Paper>
      </Box>
    </SettingsPageShell>
  );
};

export const Conditions = ({ onBack }: { onBack: () => void }) => {
  const muiTheme = useMuiTheme();
  return (
    <SettingsPageShell title="Légal" onBack={onBack}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box>
          <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>Documents Légaux</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
             Dernière mise à jour : 01 Janvier 2026.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
           {[
             'Conditions Générales',
             'Politique de Confidentialité',
             'Traitement des Données',
             'Mentions Légales'
           ].map((label, i) => (
             <MuiCard key={i} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }} elevation={0}>
                <MuiButton fullWidth sx={{ p: 3, justifyContent: 'flex-start', textTransform: 'none', color: 'text.primary', gap: 3 }}>
                   <Avatar variant="rounded" sx={{ bgcolor: alpha(muiTheme.palette.text.secondary, 0.05), color: 'text.secondary' }}>
                      <Article />
                   </Avatar>
                   <Box sx={{ flex: 1, textAlign: 'left' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{label}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>PDF • 2.4 MB</Typography>
                   </Box>
                   <ChevronRight sx={{ opacity: 0.2 }} />
                </MuiButton>
             </MuiCard>
           ))}
        </Box>

        <Typography variant="caption" sx={{ textAlign: 'center', color: 'text.secondary', fontWeight: 500, px: 4, mt: 2 }}>
           L'utilisation de ce terminal implique l'acceptation sans réserve des clauses citées ci-dessus.
        </Typography>
      </Box>
    </SettingsPageShell>
  );
};
