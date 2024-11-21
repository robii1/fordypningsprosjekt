import React from 'react';
import { Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/Home';
import HistoryScreen from './Screens/HistoryScreen';
import TrainingScreen from './Screens/TrainingScreen';
import SettingsScreen from './Screens/SettingsScreen';
import LoginScreen from './Screens/login';

// Importer bilder
const homeIcon = require('./Pictures/home.png');
const historyIcon = require('./Pictures/history.png');
const playIcon = require('./Pictures/play.png');
const settingsIcon = require('./Pictures/settings.png'); // Innstillinger-ikonet

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom Tabs for hovednavigasjon (kun synlig etter innlogging)
const BottomTabs = () => {
  return (
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
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Hjem' }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'Historikk' }} />
      <Tab.Screen name="Training" component={TrainingScreen} options={{ title: 'Trening' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Innstillinger' }} />
    </Tab.Navigator>
  );
};

// Hovednavigasjonen med Login som første skjerm
const AppNavigator = () => {
  return (
    <Stack.Navigator>
      {/* LoginScreen er første skjerm */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }} // Skjuler toppmeny
      />
      {/* BottomTabs vises etter innlogging */}
      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={{ headerShown: false }} // Skjuler toppmeny
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
