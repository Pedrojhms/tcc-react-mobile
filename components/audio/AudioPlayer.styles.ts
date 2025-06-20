import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 16,
  },
  playPauseButton: {
    marginBottom: 10,
    backgroundColor: '#2196F3',
    borderRadius: 22,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playPauseText: {
    color: '#fff',
    fontSize: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  slider: {
    flex: 1,
    marginHorizontal: 8,
    height: 40,
  },
  timeText: {
    color: '#333',
    fontVariant: ['tabular-nums'],
    fontSize: 13,
    minWidth: 40,
    textAlign: 'center',
  },
});