import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Screens/Home';
import HistoryScreen from './Screens/History';
import TrainingScreen from './Screens/Training';

// Importer bilder
const homeIcon = require('./Pictures/home.png');
const historyIcon = require('./Pictures/history.png');
const playIcon = require('./Pictures/play.png');

// Tab navigator
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            return <Image source={homeIcon} style={{ width: 40, height: 40, tintColor: color }} />;
          } else if (route.name === 'History') {
            return <Image source={historyIcon} style={{ width: 40, height: 40, tintColor: color }} />;
          } else if (route.name === 'Training') {
            return <Image source={playIcon} style={{ width: 60, height: 60, tintColor: color }} />;
          }
        },
        tabBarShowLabel: false,  
        tabBarActiveTintColor: '#ffd700',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#1e1e1e', height: 80 },  
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Training" component={TrainingScreen} options={{ headerShown: false }} />
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
