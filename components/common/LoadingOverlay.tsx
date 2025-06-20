import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface LoadingOverlayProps {
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = "Processando imagem..." }) => (
  <View style={styles.overlay}>
    <View style={styles.content}>
      <ActivityIndicator size="large" color="#2196F3" style={styles.spinner} />
      <Text style={styles.text}>{message}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 32,
    borderRadius: 16,
    elevation: 4,
  },
  spinner: {
    marginRight: 16,
  },
  text: {
    fontSize: 18,
    color: '#222',
    fontWeight: '500',
  },
});