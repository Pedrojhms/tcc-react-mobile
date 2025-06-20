import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { logger } from '../src/utils/logger';

export const useAudio = (fileUri: string) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const initAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });

        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: fileUri },
          { shouldPlay: false }
        );

        setSound(newSound);

        newSound.setOnPlaybackStatusUpdate((status: any) => {
          if (status.isLoaded) {
            setIsPlaying(status.isPlaying);
            if (status.didJustFinish) {
              setIsPlaying(false);
            }
          }
        });
      } catch (error) {
        logger.error('Error initializing audio:', error);
      }
    };

    initAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [fileUri]);

  const play = async () => {
    try {
      if (sound) {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      logger.error('Error playing audio:', error);
    }
  };

  const pause = async () => {
    try {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      logger.error('Error pausing audio:', error);
    }
  };

  const stop = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.setPositionAsync(0);
        setIsPlaying(false);
      }
    } catch (error) {
      logger.error('Error stopping audio:', error);
    }
  };

  return {
    sound,
    isPlaying,
    play,
    pause,
    stop,
  };
};