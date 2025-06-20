import { createStackNavigator } from '@react-navigation/stack';
import IndexScreen from './index';

const Stack = createStackNavigator();

export default function Layout() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="index"
        component={IndexScreen}
        options={{ title: "TCC - Transcrição de Imagens" }}
      />
    </Stack.Navigator>
  );
}