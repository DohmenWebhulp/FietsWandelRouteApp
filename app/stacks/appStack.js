import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Coordinaten from '../views/Coordinaten';

const Stack = createStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="Home"
        component={Homepage}
      />
      <Stack.Screen
        name="Profile"
        component={Coordinaten}
      />
    </Stack.Navigator>
  );
}