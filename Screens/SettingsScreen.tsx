import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

interface SettingsScreenProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; //funksjonen for å logge ut
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ setIsLoggedIn }) => {
  const handleLogout = () => {
    // Når brukeren logger ut
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Innstillinger</Text>
      <TouchableOpacity style = {styles.loginBTN} onPress={handleLogout}>
        <Text style = {styles.loginBtnText}>Logg ut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
