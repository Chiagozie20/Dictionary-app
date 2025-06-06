import React from 'react';
import { Box, Container, Typography, IconButton, Link, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const handleEmailClick = (e) => {
    e.preventDefault();
    window.location.href = 'mailto:abelchiagozie1@gmail.com?subject=Hello%20from%20Lexipal%20Dictionary';
  };

  // My Social links
  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: <GitHubIcon />, 
      url: 'https://github.com/Chiagozie20' 
    },
    { 
      name: 'LinkedIn', 
      icon: <LinkedInIcon />, 
      url: 'https://www.linkedin.com/in/abel-chukwuoma-65aa53325' 
    },
    { 
      name: 'Email', 
      icon: <EmailIcon />, 
      url: '#', // Make this a placeholder
      onClick: handleEmailClick
    }
  ];

  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)',
        borderTop: `1px solid ${theme.palette.divider}`
      }}
    >
      <Container maxWidth="md">
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center"
            sx={{ mb: { xs: 2, sm: 0 } }}
          >
            © {currentYear} lexipal Dictionary. All rights reserved.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
          {socialLinks.map((link) => (
  <IconButton
    key={link.name}
    component={link.onClick ? 'button' : Link}
    href={link.onClick ? undefined : link.url}
    onClick={link.onClick}
    target={link.onClick ? undefined : "_blank"}
    rel={link.onClick ? undefined : "noopener noreferrer"}
    aria-label={link.name}
    size="small"
    color="primary"
  >
    {link.icon}
  </IconButton>
))}
  
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;