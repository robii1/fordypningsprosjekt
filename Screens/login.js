import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/styles';

const LoginScreen = ({ setIsLoggedIn }) => {
  const [brukernavn, setBrukernavn] = useState('');
  const [passord, setPassord] = useState('');
  const [erRegistrert, setRegistrert] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/users');
      const users = await response.json();

      const user = users.find((u) => u.username === brukernavn);

      if (!user) {
        Alert.alert('feil','Bruker finnes ikke. Prøv å registrere deg.');
      } else if (user.password !== passord) {
        Alert.alert('Oida','Feil passord.');
      } else {
        Alert.alert('Velkommen','Du er nå logget inn!');
        setIsLoggedIn(true); // Sett brukeren som innlogget
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/users');
      const users = await response.json();

      if (users.find((u) => u.username === brukernavn)) {
        Alert.alert('Brukernavn er allerede registrert.');
      } else {
        const nyBruker = { id: users.length + 1, brukernavn, passord};

        await fetch('http://10.0.2.2:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'},
          body: JSON.stringify(nyBruker),
        });

        Alert.alert('Bruker registrert. Logg inn for å fortsette.');
        setRegistrert(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{erRegistrert ? 'Registrer deg' : 'Logg inn'}</Text>
      <TextInput  style={styles.input} placeholder="Brukernavn" value={brukernavn} onChangeText={setBrukernavn}/>
      <TextInput style={styles.input} placeholder="Passord" secureTextEntry value={passord} onChangeText={setPassord}/>
      
      <TouchableOpacity style={styles.loginBTN} onPress={erRegistrert ? handleRegister : handleLogin}>
      <Text style={styles.loginBtnText}>{erRegistrert ? 'Registrer' : 'Logg inn'}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setRegistrert(!erRegistrert)}>
        <Text style={styles.label}> {erRegistrert ? 'Logg inn' : 'Registrer deg'} </Text>
      </TouchableOpacity>
    </View>
    
  );
};

export default LoginScreen;
