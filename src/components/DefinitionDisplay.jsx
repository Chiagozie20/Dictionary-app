import React from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Divider, 
  Chip, 
  List, 
  ListItem, 
  ListItemText,
  Link
} from '@mui/material';
import AudioPlayer from './AudioPlayer';

const DefinitionDisplay = ({ data, loading }) => {
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h3" sx={{ mb: 2, opacity: 0.7 }}>
          Start by typing a word in search
        </Typography>
      </Box>
    );
  }

  if (data.error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" color="error">
          {data.error}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Please try another word or check your spelling.
        </Typography>
      </Box>
    );
  }

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        maxWidth: '800px', 
        mx: 'auto',
        borderRadius: 2,
        mb: 4
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h2" sx={{ mr: 2 }}>
          {data.word}
        </Typography>
        {data.audio && <AudioPlayer audioUrl={data.audio} />}
      </Box>

      {data.phonetic && (
        <Typography 
          variant="subtitle1" 
          color="text.secondary" 
          sx={{ mb: 2 }}
        >
          {data.phonetic}
        </Typography>
      )}

      <Divider sx={{ my: 3 }} />

      {data.meanings && data.meanings.map((meaning, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Chip 
              label={meaning.partOfSpeech} 
              color="primary" 
              variant="outlined" 
              sx={{ mr: 2 }} 
            />
          </Box>

          <List sx={{ pl: 2 }}>
            {meaning.definitions.map((def, defIndex) => (
              <ListItem 
                key={defIndex} 
                alignItems="flex-start"
                sx={{ 
                  display: 'list-item',
                  listStyleType: 'disc',
                  pl: 1
                }}
              >
                <ListItemText
                  primary={def.definition}
                  secondary={def.example && (
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ mt: 1, fontStyle: 'italic' }}
                    >
                      Example: {def.example}
                    </Typography>
                  )}
                />
              </ListItem>
            ))}
          </List>

          {meaning.synonyms && meaning.synonyms.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Synonyms:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {meaning.synonyms.map((synonym, synIndex) => (
                  <Chip 
                    key={synIndex} 
                    label={synonym} 
                    size="small" 
                    variant="outlined" 
                  />
                ))}
              </Box>
            </Box>
          )}

          {meaning.antonyms && meaning.antonyms.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Antonyms:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {meaning.antonyms.map((antonym, antIndex) => (
                  <Chip 
                    key={antIndex} 
                    label={antonym} 
                    size="small" 
                    variant="outlined" 
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      ))}

      {data.sourceUrls && data.sourceUrls.length > 0 && (
        <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary">
            Source:
            {data.sourceUrls.map((url, index) => (
              <Link 
                key={index} 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                sx={{ ml: 1 }}
              >
                {url}
              </Link>
            ))}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default DefinitionDisplay;