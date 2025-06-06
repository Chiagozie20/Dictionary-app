import axios from 'axios';

// For the primary English dictionary, we'll use the Free Dictionary API
const DICTIONARY_API_URL = 'https://api.dictionaryapi.dev/api/v2/entries';

// For multi-language support, we could use other APIs like these
// Note: These may require API keys and might have usage limitations
const LANGUAGE_API_MAP = {
  english: {
    url: `${DICTIONARY_API_URL}/en`,
    handler: handleEnglishResponse,
  },
  spanish: {
    url: `${DICTIONARY_API_URL}/es`,
    handler: handleStandardResponse,
  },
  french: {
    url: `${DICTIONARY_API_URL}/fr`,
    handler: handleStandardResponse,
  },
  german: {
    url: `${DICTIONARY_API_URL}/de`,
    handler: handleStandardResponse,
  },
  italian: {
    url: `${DICTIONARY_API_URL}/it`,
    handler: handleStandardResponse,
  },
};

// Fetch word definition based on selected language
export const fetchDefinition = async (word, language = 'english') => {
  try {
    if (!word.trim()) return null;
    
    const langConfig = LANGUAGE_API_MAP[language.toLowerCase()] || LANGUAGE_API_MAP.english;
    const response = await axios.get(`${langConfig.url}/${encodeURIComponent(word.trim())}`);
    
    // Use the appropriate handler for this language
    return langConfig.handler(response.data);
  } catch (error) {
    console.error('Error fetching definition:', error);
    if (error.response && error.response.status === 404) {
      return { error: 'Word not found' };
    }
    return { error: 'Failed to fetch definition' };
  }
};

// Process English API response
function handleEnglishResponse(data) {
  if (!data || data.length === 0) {
    return { error: 'No definitions found' };
  }

  const wordData = data[0];
  const result = {
    word: wordData.word,
    phonetic: wordData.phonetic || '',
    phonetics: wordData.phonetics || [],
    meanings: wordData.meanings || [],
    sourceUrls: wordData.sourceUrls || [],
    audio: '',
  };

  // Find the first available audio
  if (wordData.phonetics && wordData.phonetics.length > 0) {
    for (const phonetic of wordData.phonetics) {
      if (phonetic.audio) {
        result.audio = phonetic.audio;
        break;
      }
    }
  }

  return result;
}

// Generic handler for other languages
function handleStandardResponse(data) {
  if (!data || data.length === 0) {
    return { error: 'No definitions found' };
  }
  
  // Basic parsing for other languages
  // Note: Actual implementation may need adjustments based on API responses
  return data[0];
}

// Get list of available languages
export const getAvailableLanguages = () => {
  return Object.keys(LANGUAGE_API_MAP).map(key => ({
    code: key,
    name: key.charAt(0).toUpperCase() + key.slice(1)
  }));
};