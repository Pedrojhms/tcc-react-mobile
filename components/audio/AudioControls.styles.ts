import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
    maxWidth: 350, // impede que os botões “estiquem” demais em telas largas
    alignSelf: 'center',
  },
  spacer: {
    width: 20,
  },
});