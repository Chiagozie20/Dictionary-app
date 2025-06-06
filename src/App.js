import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import DefinitionDisplay from './components/DefinitionDisplay';
import Footer from './components/Footer';
import { fetchDefinition } from './services/dictionaryApi';

function App() {
  const [wordData, setWordData] = useState(null);
  const [language, setLanguage] = useState('english');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (word) => {
    setLoading(true);
    try {
      const data = await fetchDefinition(word, language);
      setWordData(data);
    } catch (error) {
      console.error('Error in search:', error);
      setWordData({ error: 'An error occurred while searching' });
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    // If there's a word already searched, search it again in the new language
    if (wordData && wordData.word) {
      handleSearch(wordData.word);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md" sx={{ flex: 1 }}>
        <Box sx={{ py: 3 }}>
          <Header 
            language={language} 
            onLanguageChange={handleLanguageChange} 
          />
          <SearchBar onSearch={handleSearch} />
          <DefinitionDisplay data={wordData} loading={loading} />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default App;