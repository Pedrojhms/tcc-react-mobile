import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { logger } from '../../src//utils/logger';
import { AudioControls } from './AudioControls';
import { styles } from './AudioPlayer.styles';

interface AudioPlayerProps {
  fileUri: string;
  autoPlay?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  fileUri, 
  autoPlay = true // Habilitando autoplay por padrão
}) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setupAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [fileUri]);

  const setupAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });
      
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: fileUri },
        { shouldPlay: autoPlay }, // Usando autoPlay aqui
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      if (autoPlay) {
        setIsPlaying(true);
      }

    } catch (error) {
      logger.error('Erro ao configurar áudio:', error);
    }
  };

  const onPlaybackStatusUpdate = async (status: any) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      if (status.didJustFinish) {
        setIsPlaying(false);
        // Resetar para o início ao terminar
        if (sound) {
          await sound.setPositionAsync(0);
        }
      }
    }
  };

  const handlePlay = async () => {
    try {
      if (sound) {
        const status = await sound.getStatusAsync();
        // Checa se o status está carregado antes de acessar positionMillis/durationMillis
        if (status.isLoaded) {
          if (status.positionMillis === status.durationMillis) {
            await sound.setPositionAsync(0);
          }
          await sound.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      logger.error('Erro ao reproduzir:', error);
    }
  };

  const handlePause = async () => {
    try {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      logger.error('Erro ao pausar:', error);
    }
  };

  const handleStop = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.setPositionAsync(0);
        setIsPlaying(false);
      }
    } catch (error) {
      logger.error('Erro ao parar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <AudioControls
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        onStop={handleStop}
      />
    </View>
  );
};