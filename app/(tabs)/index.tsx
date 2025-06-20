import * as FileSystem from 'expo-file-system';
import { Stack } from "expo-router";
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AudioPlayer } from '../../components/audio/AudioPlayer';
import { Button } from '../../components/common/Button';
import { DebugInfo } from '../../components/common/DebugInfo';
import { LoadingOverlay } from '../../components/common/LoadingOverlay';
import { ImagePicker } from '../../components/image/ImagePicker';
import { uploadImageForAnalysis } from '../../src/api/webhooks';
import { arrayBufferToBase64 } from '../../src/utils/converters';

const TabOneScreen = () => {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  const addDebugMessage = (message: string) => {
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    setDebugInfo(prev => `${prev}\n${timestamp}: ${message}`);
  };

  const handleImageSelected = (uri: string) => {
    setSelectedImage(uri);
    setAudioUri(null);
    addDebugMessage('Nova imagem selecionada');
  };

  const handleTranscribe = async () => {
    if (!selectedImage) return;

    setLoading(true);
    addDebugMessage('Iniciando transcrição...');

    try {
      const audioBuffer = await uploadImageForAnalysis(selectedImage);
      addDebugMessage('Áudio recebido');

      const fileName = `audio_${Date.now()}.mp3`;
      const tempAudioPath = `${FileSystem.cacheDirectory}${fileName}`;

      await FileSystem.writeAsStringAsync(
        tempAudioPath,
        arrayBufferToBase64(new Uint8Array(audioBuffer)),
        { encoding: FileSystem.EncodingType.Base64 }
      );

      setAudioUri(tempAudioPath);
      addDebugMessage('Transcrição concluída');

    } catch (error: any) {
      addDebugMessage(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setAudioUri(null);
    setDebugInfo('');
    addDebugMessage('Processo reiniciado');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "TCC - Transcrição de Imagens" }} />
      <DebugInfo text={debugInfo} />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <ImagePicker 
          onImageSelected={handleImageSelected}
          selectedImage={selectedImage}
        />

        <View style={styles.buttonContainer}>
          {selectedImage && !loading && !audioUri && (
            <Button
              title="Transcrever Imagem"
              onPress={handleTranscribe}
              variant="secondary"
            />
          )}

          {audioUri && (
            <View style={styles.audioContainer}>
              <AudioPlayer 
                fileUri={audioUri} 
                autoPlay={true}
              />
              <Button
                title="Nova Transcrição"
                onPress={handleReset}
                variant="primary"
              />
            </View>
          )}
        </View>
      </ScrollView>

      {loading && <LoadingOverlay message="Transcrevendo imagem..." />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  content: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 100, // Espaço para o DebugInfo
    gap: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
  audioContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  }
});

export default TabOneScreen;