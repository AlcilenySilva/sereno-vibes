import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { View, Text } from 'react-native';

import BoasVindas from './boasvindas';
import Login from './login';
import Principal from './principal';

// Telas fictícias temporárias só para testar os ícones
function Historico() {
  return (
    <View><Text>Histórico (teste)</Text></View>
  );
}

function Autocuidado() {
  return (
    <View><Text>Autocuidado (teste)</Text></View>
  );
}

function Encaminhamentos() {
  return (
    <View><Text>Encaminhamentos (teste)</Text></View>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#6C41F2',
        tabBarInactiveTintColor: '#000',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Principal') {
            return <Feather name="edit-3" size={size} color={color} />;
          } else if (route.name === 'Historico') {
            return <Feather name="file-text" size={size} color={color} />;
          } else if (route.name === 'Autocuidado') {
            return <FontAwesome name="heart-o" size={size} color={color} />;
          } else if (route.name === 'Encaminhamentos') {
            return <Feather name="message-square" size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Principal" component={Principal} />
      <Tab.Screen name="Historico" component={Historico} />
      <Tab.Screen name="Autocuidado" component={Autocuidado} />
      <Tab.Screen name="Encaminhamentos" component={Encaminhamentos} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BoasVindas">
        <Stack.Screen name="BoasVindas" component={BoasVindas} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
