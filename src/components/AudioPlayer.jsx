import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const AudioPlayer = ({ audioUrl }) => {
  const audio = React.useRef(new Audio());

  const playAudio = () => {
    if (audioUrl) {
      audio.current.src = audioUrl;
      audio.current.play().catch(error => {
        console.error("Failed to play audio:", error);
      });
    }
  };

  if (!audioUrl) {
    return null;
  }

  return (
    <Tooltip title="Listen to pronunciation">
      <IconButton 
        onClick={playAudio} 
        color="primary"
        aria-label="listen to pronunciation"
      >
        <VolumeUpIcon />
      </IconButton>
    </Tooltip>
  );
};

export default AudioPlayer;