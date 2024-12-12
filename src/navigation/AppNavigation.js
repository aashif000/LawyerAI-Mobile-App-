import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import ChatBotPage from '../components/ChatBotPage';
// Import other screens

const Tab = createBottomTabNavigator();

const AppNavigation = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="ChatBot"
      component={ChatBotPage}
      options={{
        tabBarIcon: ({ color, size }) => <MaterialIcons name="assistant" size={size} color={color} />
        ,
      }}
    />
    {/* Add other tabs for Home, Camera, etc. */}
  </Tab.Navigator>
);

export default AppNavigation;
