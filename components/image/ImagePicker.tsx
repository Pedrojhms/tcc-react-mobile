import * as ExpoImagePicker from 'expo-image-picker';
import React from 'react';
import { Alert, View } from 'react-native';
import { Button } from '../common/Button';
import { styles } from './ImagePicker.styles';
import { ImagePreview } from './ImagePreview';

interface ImagePickerProps {
  onImageSelected: (uri: string) => void;
  selectedImage: string | null;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
  onImageSelected,
  selectedImage,
}) => {
  const pickImage = async () => {
    try {
      const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permissão Necessária',
          'Precisamos de acesso à sua galeria de fotos para continuar.'
        );
        return;
      }

      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error: any) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem: ' + error.message);
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ExpoImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permissão Necessária',
          'Precisamos de acesso à câmera para continuar.'
        );
        return;
      }

      const result = await ExpoImagePicker.launchCameraAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error: any) {
      Alert.alert('Erro', 'Não foi possível tirar a foto: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage && (
        <View style={styles.previewWrapper}>
          <ImagePreview uri={selectedImage} />
        </View>
      )}
      <View style={styles.buttonColumn}>
        <Button
          title={selectedImage ? "Trocar Imagem" : "Selecionar Imagem"}
          onPress={pickImage}
          variant="primary"
        />
        <View style={styles.separator} />
        <Button
          title="Tirar Foto"
          onPress={takePhoto}
          variant="secondary"
        />
      </View>
    </View>
  );
};