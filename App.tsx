import React from 'react';
import { Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Screens/Home';
import HistoryScreen from './Screens/HistoryScreen';
import TrainingScreen from './Screens/TrainingScreen';
import SettingsScreen from './Screens/SettingsScreen';

// Importer bilder
const homeIcon = require('./Pictures/home.png');
const historyIcon = require('./Pictures/history.png');
const playIcon = require('./Pictures/play.png');
const settingsIcon = require('./Pictures/settings.png'); // Innstillinger-ikonet

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
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
                backgroundColor: focused ? '#333' : 'transparent', // Bakgrunn for valgt tab
                borderWidth: focused ? 3 : 0,
                borderColor: focused ? '#00c8ff' : 'transparent', // Ring rundt valgt tab
              }}
            >
              <Image source={iconSource} style={{ width: 40, height: 40, tintColor: color }} />
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#00c8ff',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#1e1e1e', height: 80 },
      })}
    >
      <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'Historikk' }} />
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Hjem' }} />
      <Tab.Screen name="Training" component={TrainingScreen} options={{ title: 'Trening' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Innstillinger' }} />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}

export default App;
