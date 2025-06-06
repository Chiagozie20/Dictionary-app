import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { ThemeContext } from '../context/ThemeContext';
import { useTheme } from '@mui/material/styles';

const Header = ({ language, onLanguageChange }) => {
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);

  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0}
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        mb: 3
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            letterSpacing: '0.1em',
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 300
          }}
        >
          lexipal
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LanguageSelector 
            language={language} 
            onLanguageChange={onLanguageChange} 
          />
          <ThemeToggle 
            isDarkMode={theme.palette.mode === 'dark'} 
            toggleTheme={colorMode.toggleColorMode} 
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;