import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/styles';
import { getAllUsers, addUser, loginUser } from '../api';


const LoginScreen = ({ setIsLoggedIn }) => {
  const [brukernavn, setBrukernavn] = useState('');
  const [passord, setPassord] = useState('');
  const [erRegistrert, setRegistrert] = useState(false);

  //logg inn med hash
  const loginFunk = async () => {
    try {
      const response = await loginUser({ username: brukernavn, password: passord });
      Alert.alert('Velkommen', 'Du er nå logget inn!');
      setIsLoggedIn(true); // Sett brukeren som innlogget
    } catch (error) {
      if (error.response?.status === 401) {
        Alert.alert('Feil', 'Feil passord.');
      } else if (error.response?.status === 404) {
        Alert.alert('Feil', 'Bruker finnes ikke. Prøv å registrere deg.');
      } else {
        console.error('Feil:', error);
        Alert.alert('Feil', 'Kunne ikke logge inn.');
      }
    }
  };

 // Registrer
const registerFunk = async () => {
  try {
    const users = await getAllUsers();
    if (users.find((u) => u.username === brukernavn)) {
      Alert.alert('Feil', 'Brukernavn er allerede registrert.');
    } else {
      const nyBruker = { username: brukernavn, password: passord };
      await addUser(nyBruker);
      Alert.alert('Registrert!', 'Bruker registrert. Logg inn for å fortsette.');
      setRegistrert(false);
    }
  } catch (error) {
    console.error('Feil:', error);
    Alert.alert('Feil', 'Kunne ikke registrere bruker.');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{erRegistrert ? 'Registrer deg' : 'Logg inn'}</Text>
      <TextInput  style={styles.input} placeholder="Brukernavn" value={brukernavn} onChangeText={setBrukernavn}/>
      <TextInput style={styles.input} placeholder="Passord" secureTextEntry value={passord} onChangeText={setPassord}/>
      
      <TouchableOpacity style={styles.loginBTN} onPress={erRegistrert ? registerFunk : loginFunk}>
      <Text style={styles.loginBtnText}>{erRegistrert ? 'Registrer' : 'Logg inn'}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setRegistrert(!erRegistrert)}>
        <Text style={styles.label}> {erRegistrert ? 'Logg inn' : 'Registrer deg'} </Text>
      </TouchableOpacity>
    </View>
    
  );
};

export default LoginScreen;
