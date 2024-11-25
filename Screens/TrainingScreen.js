import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/styles';
import { getTrainings, postTraining } from '../api'; // prøver ut api på Trainingscreen

const TrainingScreen = () => {
  const [øvelsestype, setØvelsestype] = useState('');
  const [repetisjoner, setRepetisjoner] = useState('');
  const [serier, setSerier] = useState('');
  const [vekt, setVekt] = useState('');
  const [tretthet, setTretthet] = useState('1');
  const [kommentar, setKommentar] = useState('');
  const [exercises, setExercises] = useState([]);
  const [trainings, setTrainings] = useState([]);

  // Hent treningsdata fra serveren
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const data = await getTrainings();
        setTrainings(data);
      } catch (error) {
        Alert.alert('Feil', 'Kunne ikke hente treninger fra serveren.');
      }
    };
    fetchTrainings();
  }, []);

  const addExercise = () => {
    if (!øvelsestype || !repetisjoner || !serier || !vekt) {
      Alert.alert('Feil', 'Alle feltene må fylles ut!');
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

  const finishSession = async () => {
    if (exercises.length === 0) {
      Alert.alert('Feil', 'Legg til minst én øvelse før du lagrer.');
      return;
    }

    const newTraining = {
      utøverID: 1, // Sett riktig bruker-ID (hardkodet her som eksempel)
      dato: new Date().toISOString().split('T')[0],
      varighet: exercises.length * 10, // Eksempel: 10 minutter per øvelse
      øvelsestype: exercises.map((e) => e.øvelsestype).join(', '),
      tretthet: parseInt(tretthet),
      kommentar,
    };

    try {
      await postTraining(newTraining);
      Alert.alert('Suksess', 'Treningsøkten ble lagret!');
      setExercises([]);
      setTretthet('1');
      setKommentar('');
      setTrainings([...trainings, newTraining]); // Oppdater visningen med ny økt
    } catch (error) {
      Alert.alert('Feil', 'Kunne ikke lagre treningsøkten.');
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
