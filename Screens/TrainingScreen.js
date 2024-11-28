import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/styles';

const TrainingScreen = () => {
  const [øvelsestype, setØvelsestype] = useState('');
  const [repetisjoner, setRepetisjoner] = useState('');
  const [serier, setSerier] = useState('');
  const [vekt, setVekt] = useState('');
  const [tretthet, setTretthet] = useState('1');
  const [kommentar, setKommentar] = useState('');
  const [exercises, setExercises] = useState([]);
  const [availableExercises, setAvailableExercises] = useState([]);

  // Hent øvelser fra dummydata.json
  useEffect(() => {
    fetch('http://10.0.2.2:3000/exercises')
      .then((response) => response.json())
      .then((data) => setAvailableExercises(data))
      .catch((error) => console.error('Error fetching exercises:', error));
  }, []);

  const addExercise = () => {
    if (!øvelsestype || !repetisjoner || !serier || !vekt) {
      Alert.alert('Feil', 'Alt må fylles ut!');
      return;
    }
    const newExercise = {
      id: exercises.length + 1,
      øvelsestype,
      repetisjoner,
      serier,
      vekt,
    };
    setExercises([...exercises, newExercise]);
    setØvelsestype('');
    setRepetisjoner('');
    setSerier('');
    setVekt('');
  };

  const removeExercise = (id) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  };

  const finishSession = async () => {
    if (exercises.length === 0) {
      Alert.alert('Feil', 'Legg til en øvelse før du lagrer.');
      return;
    }
  
    // Opprett treningsdata med detaljer for hver øvelse
    const newTraining = exercises.map((exercise) => ({
      treningsregistreringID: Date.now() + Math.random(), // Unik ID basert på tid
      utøverID: 1,
      dato: new Date().toISOString().split('T')[0],
      øvelsestype: exercise.øvelsestype,
      vekt: parseInt(exercise.vekt, 10),
      repetisjoner: parseInt(exercise.repetisjoner, 10),
      serier: parseInt(exercise.serier, 10),
      tretthet: parseInt(tretthet, 10),
      kommentar,
    }));
  
    try {
      // Post hver øvelse separat
      for (const training of newTraining) {
        await fetch('http://10.0.2.2:3000/sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(training),
        });
      }
  
      Alert.alert('Bra jobbet', 'Treningsøkten ble lagret!');
      setExercises([]); // Tøm øvelser etter lagring
      setTretthet('1');
      setKommentar('');
    } catch (error) {
      Alert.alert('Feil', 'Kunne ikke lagre treningsøkten.');
      console.error('Error posting session:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trening</Text>

      {/* Picker for å velge øvelsestype */}
      <Picker
        selectedValue={øvelsestype}
        style={styles.picker}
        onValueChange={(itemValue) => setØvelsestype(itemValue)}
      >
        <Picker.Item label="Velg øvelse" value="" />
        {availableExercises.map((exercise) => (
          <Picker.Item key={exercise.øvelseID} label={exercise.navn} value={exercise.navn} />
        ))}
      </Picker>

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
        placeholder="Vekt (kg)"
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={styles.exerciseText}>{item.øvelsestype}</Text>
                <Text style={styles.exerciseText}>
                  Reps: {item.repetisjoner}, Serier: {item.serier}, Vekt: {item.vekt}kg
                </Text>
              </View>
              <TouchableOpacity onPress={() => removeExercise(item.id)}>
                <Text style={{ color: 'red', fontSize: 16 }}>X</Text>
              </TouchableOpacity>
            </View>
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
        <Text style={styles.finishButtonText}>Lagre økt</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TrainingScreen;
