import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Lag en "interface" for å definere hva SettingsScreen kan motta
interface SettingsScreenProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // Dette er funksjonen for å logge ut
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ setIsLoggedIn }) => {
  const handleLogout = () => {
    // Når brukeren logger ut
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Innstillinger</Text>
      {/* Legg til en knapp for å logge ut */}
      <TouchableOpacity  onPress={handleLogout}>
        <Text>Logg ut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#00c8ff',
  },
});