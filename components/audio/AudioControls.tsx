import React from 'react';
import { View } from 'react-native';
import { Button } from '../common/Button';
import { styles } from './AudioControls.styles';

interface AudioControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying,
  onPlay,
  onPause,
  onStop
}) => {
  return (
    <View style={styles.container}>
      <Button
        title={isPlaying ? "Pausar" : "Reproduzir"}
        onPress={isPlaying ? onPause : onPlay}
        variant={isPlaying ? "danger" : "primary"}
      />
      
      <View style={styles.spacer} />
      
      <Button
        title="Parar"
        onPress={onStop}
        variant="secondary"
      />
    </View>
  );
};