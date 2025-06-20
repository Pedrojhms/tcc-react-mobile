export interface AudioStatus {
  isLoaded: boolean;
  isPlaying: boolean;
  didJustFinish: boolean;
}

export interface ImagePickerResult {
  uri: string;
  type: string;
  name: string;
}

export interface DebugInfo {
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'debug';
}