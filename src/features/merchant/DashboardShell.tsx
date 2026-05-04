import { ReactNode } from 'react';
import { Home, ClipboardList, ShoppingCart, MoreHorizontal, Sun, Moon } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '@/src/ui/components/Base';
import { motion } from 'motion/react';
import { useTheme } from '@/src/context/ThemeContext';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Avatar, 
  Badge, 
  BottomNavigation, 
  BottomNavigationAction, 
  Paper,
  styled,
  Container
} from '@mui/material';

const StyledBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiBottomNavigationAction-label': {
    fontSize: '0.625rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginTop: '4px',
  },
}));

const ActiveIndicator = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  width: '48px',
  height: '28px',
  borderRadius: '14px',
  backgroundColor: theme.palette.primary.light,
  zIndex: -1,
}));

export const DashboardShell = ({ children, activeTab }: { children: ReactNode, activeTab: string }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Home, path: '/merchant/dashboard' },
    { id: 'reviews', label: 'Revues', icon: ClipboardList, path: '/merchant/reviews' },
    { id: 'orders', label: 'Ventes', icon: ShoppingCart, path: '/merchant/orders' },
    { id: 'more', label: 'Menu', icon: MoreHorizontal, path: '/merchant/settings' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ flex: 1, position: 'relative', maxWidth: '450px', mx: 'auto', width: '100%', bgcolor: 'background.paper', boxShadow: 3 }}>
        
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid', borderColor: 'divider', color: 'text.primary' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
            <Logo size="sm" />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={toggleTheme} size="small" sx={{ border: '1px solid', borderColor: 'divider' }}>
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} style={{ color: '#f59e0b' }} />}
              </IconButton>
              <Badge variant="dot" color="success" overlap="circular" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Avatar sx={{ width: 32, height: 32, fontSize: '0.75rem', fontWeight: 800, bgcolor: 'primary.main' }}>JD</Avatar>
              </Badge>
            </Box>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ p: 3, pb: 12 }}>
          {children}
        </Box>

        <Paper sx={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '450px', zIndex: 1000 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={tabs.findIndex(t => t.id === activeTab)}
            onChange={(_, newValue) => {
              navigate(tabs[newValue].path);
            }}
            sx={{ height: 80, pb: 2, pt: 1, borderRadius: '24px 24px 0 0' }}
          >
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.id;
              return (
                <StyledBottomNavigationAction
                  key={tab.id}
                  label={tab.label}
                  icon={
                    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {isActive && (
                        <ActiveIndicator 
                          layoutId="nav-pill"
                          transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                        />
                      )}
                      <tab.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                    </Box>
                  }
                />
              );
            })}
          </BottomNavigation>
        </Paper>
      </Box>
    </Box>
  );
};
