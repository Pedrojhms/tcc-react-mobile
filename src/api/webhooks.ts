import { API_CONFIG } from './config';

export const uploadImageForAnalysis = async (imageUri: string): Promise<ArrayBuffer> => {
  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'image.jpg',
  } as any);

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.IMAGE_ANALYZE}`, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': API_CONFIG.HEADERS.ACCEPT_AUDIO,
      'Content-Type': API_CONFIG.HEADERS.CONTENT_TYPE_FORM,
    },
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  return response.arrayBuffer();
};