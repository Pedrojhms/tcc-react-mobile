import React from 'react';
import { Platform, ScrollView, StyleSheet, Text } from 'react-native';

interface DebugInfoProps {
  text: string;
}

export const DebugInfo: React.FC<DebugInfoProps> = ({ text }) => (
  <ScrollView 
    style={styles.container}
    contentContainerStyle={styles.contentContainer}
  >
    <Text style={styles.text}>{text}</Text>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    maxHeight: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    zIndex: 1000,
  },
  contentContainer: {
    padding: 10,
  },
  text: {
    fontSize: 12,
    color: '#666',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
});