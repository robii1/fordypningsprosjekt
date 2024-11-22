import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/styles';

const LoginScreen = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/users');
      const users = await response.json();

      const user = users.find((u) => u.username === username);

      if (!user) {
        Alert.alert('Feil', 'Bruker finnes ikke. Prøv å registrere deg.');
      } else if (user.password !== password) {
        Alert.alert('Feil', 'Feil passord.');
      } else {
        Alert.alert('Velkommen', `Logget inn som ${user.username}`);
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

      if (users.find((u) => u.username === username)) {
        Alert.alert('Feil', 'Brukernavn er allerede registrert.');
      } else {
        const newUser = {
          id: users.length + 1,
          username,
          password,
        };

        await fetch('http://10.0.2.2:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        Alert.alert('Suksess', 'Bruker registrert. Logg inn for å fortsette.');
        setIsRegister(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegister ? 'Registrer deg' : 'Logg inn'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Brukernavn"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Passord"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.finishButton}
        onPress={isRegister ? handleRegister : handleLogin}
      >
        <Text style={styles.finishButtonText}>{isRegister ? 'Registrer' : 'Logg inn'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 20 }} onPress={() => setIsRegister(!isRegister)}>
        <Text style={styles.label}>
          {isRegister ? 'Har du allerede en konto? Logg inn' : 'Ingen konto? Registrer deg'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
