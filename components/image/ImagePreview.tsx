import React from 'react';
import { Image, View } from 'react-native';
import { styles } from './ImagePreview.styles';

interface ImagePreviewProps {
  uri: string;
  width?: number;
  height?: number;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  uri, 
  width = 300, 
  height = 300 
}) => {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri }} 
        style={[
          styles.image,
          {
            width,
            height
          }
        ]}
        resizeMode="contain"
      />
    </View>
  );
};
