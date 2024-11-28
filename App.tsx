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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Styrer innloggingstilstanden

  return (
    <NavigationContainer>
      {/* Vis kun LoginScreen hvis brukeren ikke er logget inn */}
      {!isLoggedIn ? (
        <LoginScreen setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              let iconSource;

              if (route.name === 'History') {
                iconSource = historyIcon;
              } else if (route.name === 'Home') {
                iconSource = homeIcon;
              } else if (route.name === 'Training') {
                iconSource = playIcon;
              } else if (route.name === 'Settings') {
                iconSource = settingsIcon;
              }

              return (
                <Image source={iconSource} style={{ marginTop: 15, width: 40, height:40, tintColor: color }} />
              );
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#00c8ff', // Farge for aktiv tab
            tabBarInactiveTintColor: '#fff', // Farge for inaktive tabs
            tabBarStyle: { backgroundColor: '#1e1e1e', height: 60  }, 
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Hjem' }} />
          <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'Historikk' }} />
          <Tab.Screen name="Training" component={TrainingScreen} options={{ title: 'Trening' }} />
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
