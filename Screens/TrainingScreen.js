import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/styles';
import TretthetPicker from '../Components/tretthetPicker';
import ØvelseListe from '../Components/øvelseListe'
import ØvelsePicker from '../Components/øvelsePicker'

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
      <ØvelsePicker
      availableExercises={availableExercises}
      onSelect={(selected) => setØvelsestype(selected)}
      ></ØvelsePicker>

      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        placeholder="Repetisjoner"
        keyboardType="numeric"
        value={repetisjoner}
        onChangeText={setRepetisjoner}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        placeholder="Serier"
        keyboardType="numeric"
        value={serier}
        onChangeText={setSerier}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        placeholder="Vekt (kg)"
        keyboardType="numeric"
        value={vekt}
        onChangeText={setVekt}
      />
        <TouchableOpacity onPress={addExercise}>
        <Text style = {styles.loginBtnText}>+   Legg til</Text>
        </TouchableOpacity>


      <ØvelseListe  exercises={exercises} onRemove={removeExercise}/>
      
      
      <Text style={styles.label}>Tretthet (1-10)</Text>
      <TretthetPicker selectedValue={tretthet} onChange={(value) => setTretthet(value)} />
      <TextInput
        style={styles.input}
        placeholder="Kommentar"
        placeholderTextColor="#999"
        value={kommentar}
        onChangeText={setKommentar}/>
      <TouchableOpacity style={styles.exerciseButton} onPress={finishSession}>
        <Text style={styles.exerciseButtonText}>Lagre økt</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TrainingScreen;
