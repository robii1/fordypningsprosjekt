import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

interface SettingsScreenProps {
  // setIsLoggedIn er en funksjon som: 
  // tar state true eller false avhengig av innlogget og oppdaterer state.
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; 
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ setIsLoggedIn }) => {
  const handleLogout = () => {
    // settes til false og logger dermed ut
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
