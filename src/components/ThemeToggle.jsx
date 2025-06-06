import React from 'react';
import { IconButton, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
    return (
      <IconButton onClick={toggleTheme} color="inherit" size="large">
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    );
  }

  return (
    <Button
      onClick={toggleTheme}
      startIcon={isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      variant="text"
      color="inherit"
      sx={{ ml: 2 }}
    >
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
};

export default ThemeToggle;