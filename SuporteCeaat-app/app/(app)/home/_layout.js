import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './home';
import InfoScreen from './infoScreen';

// Criar o Tab Navigator
const Tab = createBottomTabNavigator();


export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Informações') {
            iconName = focused
              ? 'people'
              : 'people-outline';
          } else if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } 

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Informações" component={InfoScreen} />
    </Tab.Navigator>
  );
}
