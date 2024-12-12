import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';
import { temaKontekst } from '../styles/styles'; 
//Nick. React useContext and Typescript. Hentet fra
// https://medium.com/@storydev123/react-usecontext-and-typescript-c359065375e1

interface SettingsScreen {
  // setIsLoggedIn er en funksjon som: 
  // tar state true eller false avhengig av innlogget og oppdaterer state.
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; 
}

const SettingsScreen: React.FC<SettingsScreen> = ({ setIsLoggedIn }) => {
  const { tema, brukTema } = useContext(temaKontekst); // Hent tema og funksjonalitet for å endre det

  const loggUt = () => {
    // settes til false og logger dermed ut
    setIsLoggedIn(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: tema }]}>
      <Text style={styles.title}>Innstillinger</Text>

      <TouchableOpacity style={styles.loginBTN} onPress={brukTema}>
        <Text style={styles.loginBtnText}>Bytt bakgrunnsfarge</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBTN} onPress={loggUt}>
        <Text style={styles.loginBtnText}>Logg ut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
