import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/styles';

const TrainingScreen = () => {
  const [øvelsestype, setØvelsestype] = useState('');
  const [repetisjoner, setRepetisjoner] = useState('');
  const [serier, setSerier] = useState('');
  const [vekt, setVekt] = useState(''); // Nytt felt for vekt
  const [tretthet, setTretthet] = useState('1');
  const [kommentar, setKommentar] = useState('');
  const [exercises, setExercises] = useState([]);

  const addExercise = () => {
    const newExercise = {
      id: exercises.length + 1,
      øvelsestype,
      repetisjoner,
      serier,
      vekt, // Legger til vekt i øvelsen
    };
    setExercises([...exercises, newExercise]);
    setØvelsestype('');
    setRepetisjoner('');
    setSerier('');
    setVekt('');
  };

  const finishSession = async () => {
    const newSession = {
      dato: new Date().toISOString().split('T')[0],
      tretthet: parseInt(tretthet),
      kommentar,
      exercises,
    };

    try {
      const response = await fetch('http://10.0.2.2:3000/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSession),
      });

      if (response.ok) {
        console.log('Økten ble lagret:', newSession);
        setExercises([]);
        setTretthet('1');
        setKommentar('');
      } else {
        console.error('Feil ved lagring av økten');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trening</Text>

      <TextInput
        style={styles.input}
        placeholder="Øvelsestype"
        placeholderTextColor="#999"
        value={øvelsestype}
        onChangeText={setØvelsestype}
      />
      <TextInput
        style={styles.input}
        placeholder="Repetisjoner"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={repetisjoner}
        onChangeText={setRepetisjoner}
      />
      <TextInput
        style={styles.input}
        placeholder="Serier"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={serier}
        onChangeText={setSerier}
      />
      <TextInput
        style={styles.input}
        placeholder="Vekt (kg)" // Nytt felt for vekt
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={vekt}
        onChangeText={setVekt}
      />
      <Button title="Legg til øvelse" onPress={addExercise} />

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Text style={styles.exerciseText}>{item.øvelsestype}</Text>
            <Text style={styles.exerciseText}>
              Reps: {item.repetisjoner}, Serier: {item.serier}, Vekt: {item.vekt}kg
            </Text>
          </View>
        )}
      />

      <Text style={styles.label}>Tretthet (1-10)</Text>
      <Picker
        selectedValue={tretthet}
        style={styles.picker}
        onValueChange={(itemValue) => setTretthet(itemValue)}
      >
        {[...Array(10).keys()].map((i) => (
          <Picker.Item key={i + 1} label={(i + 1).toString()} value={(i + 1).toString()} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Kommentar"
        placeholderTextColor="#999"
        value={kommentar}
        onChangeText={setKommentar}
      />

      <TouchableOpacity style={styles.finishButton} onPress={finishSession}>
        <Text style={styles.finishButtonText}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TrainingScreen;
