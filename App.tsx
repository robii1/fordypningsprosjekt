import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Screens/ProfileScreen';
import HistoryScreen from './Screens/HistoryScreen';
import TrainingScreen from './Screens/TrainingScreen';
import SettingsScreen from './Screens/SettingsScreen';
import LoginScreen from './Screens/login';

// Importer bilder for ikoner
const homeIcon = require('./Pictures/home.png');
const historyIcon = require('./Pictures/history.png');
const playIcon = require('./Pictures/play.png');
const settingsIcon = require('./Pictures/settings.png');

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // sett true for å skippe, denne styrer tilstand av innlogget

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <LoginScreen setIsLoggedIn={setIsLoggedIn} />) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              let ikon;

              if (route.name === 'History') {
                ikon = historyIcon;} else if (route.name === 'Home') {
                ikon = homeIcon; } else if (route.name === 'Training') {
                ikon = playIcon; } else if (route.name === 'Settings') {
                ikon = settingsIcon;}

              return (
                <Image source={ikon} style={{ marginTop: 15, width: 40, height:40, tintColor: color }} />
              );
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#fff', // Farge for aktiv tab
            tabBarInactiveTintColor: '#858585', // Farge for inaktive tabs
            tabBarStyle: { backgroundColor: '#1e1e1e', height: 60  }, 
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="History" component={HistoryScreen} />
          <Tab.Screen name="Training" component={TrainingScreen} />
          <Tab.Screen
            name="Settings"
            children={() => <SettingsScreen setIsLoggedIn={setIsLoggedIn} />}
            options={{ title: 'Innstillinger' }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
