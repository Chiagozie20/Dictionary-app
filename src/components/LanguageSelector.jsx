import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { getAvailableLanguages } from '../services/dictionaryApi';

const LanguageSelector = ({ language, onLanguageChange }) => {
  const languages = getAvailableLanguages();

  return (
    <Box sx={{ minWidth: 120, mr: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="language-select-label">Language</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={language}
          label="Language"
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;