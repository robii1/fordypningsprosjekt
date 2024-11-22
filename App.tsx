import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Screens/Home';
import HistoryScreen from './Screens/HistoryScreen';
import TrainingScreen from './Screens/TrainingScreen';
import SettingsScreen from './Screens/SettingsScreen';
import LoginScreen from './Screens/login';

// Importer bilder
const homeIcon = require('./Pictures/home.png');
const historyIcon = require('./Pictures/history.png');
const playIcon = require('./Pictures/play.png');
const settingsIcon = require('./Pictures/settings.png');
const loginIcon = require('./Pictures/login.png')

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Styrer om brukeren er logget inn

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, focused }) => {
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
              <View
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: focused ? '#333' : 'transparent',
                  borderWidth: focused ? 3 : 0,
                  borderColor: focused ? '#00c8ff' : 'transparent',
                }}
              >
                <Image source={loginIcon} style={{ width: 40, height: 40, tintColor: color }} />
              </View>
            );
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#00c8ff',
          tabBarInactiveTintColor: '#fff',
          tabBarStyle: { backgroundColor: '#1e1e1e', height: 80 },
        })}
      >
        {/* Hvis ikke innlogget, vis kun login-skjerm */}
        {!isLoggedIn ? (
          <Tab.Screen
            name="Login"
            children={() => <LoginScreen setIsLoggedIn={setIsLoggedIn} />}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Hjem' }} />
            <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'Historikk' }} />
            <Tab.Screen name="Training" component={TrainingScreen} options={{ title: 'Trening' }} />
            <Tab.Screen
  name="Settings"
  children={() => <SettingsScreen setIsLoggedIn={setIsLoggedIn} />}
  options={{ title: 'Innstillinger' }}
/>

          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
