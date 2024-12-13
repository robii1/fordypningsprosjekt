import React, { useState, useEffect, useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/styles';
import TretthetPicker from '../Components/tretthetPicker';
import ØvelseListe from '../Components/øvelseListe';
import ØvelsePicker from '../Components/øvelsePicker';
import { getAllExercises, postTraining } from '../api';
import { temaKontekst } from '../styles/styles';

const TrainingScreen = () => {
  const [øvelsestype, setØvelsestype] = useState('');
  const [repetisjoner, setRepetisjoner] = useState('');
  const [serier, setSerier] = useState('');
  const [vekt, setVekt] = useState('');
  const [tretthet, setTretthet] = useState('1');
  const [kommentar, setKommentar] = useState('');
  const [exercises, setExercises] = useState([]);
  const [availableExercises, setAvailableExercises] = useState([]);
  const { tema } = useContext(temaKontekst);
 
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getAllExercises();
        setAvailableExercises(data);
      } catch (error) {
        console.error('Feil ved henting av øvelser:', error);
      }
    };
    fetchExercises();
    
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
      vekt};
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

    const newTraining = exercises.map((exercise) => ({
      utøverID: 1, //Foreløpig er den hardkodet men må settes lik User (id)
      dato: new Date().toISOString().split('T')[0] ,//datoen settes til leselig, men det er noe rart med MySQL lagringen av datoer
      øvelsestype: exercise.øvelsestype,
      vekt: parseInt(exercise.vekt, 10),
      repetisjoner: parseInt(exercise.repetisjoner, 10),
      serier: parseInt(exercise.serier, 10),
      tretthet: parseInt(tretthet, 10),
      kommentar,
    }));
    

    try {
      for (const training of newTraining) {
        await postTraining(training);
      }
      Alert.alert('Bra jobbet', 'Treningsøkten ble lagret!');
      setExercises([]); //Øvelsene settes
      setTretthet('1'); //Tretthet settes 
      setKommentar(''); //kommentar settes
    } catch (error) {
      console.error('Feil ved lagring av treningsøkt:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: tema }]}>
      <Text style={styles.title}>Trening</Text>
      {/*Hentet fra Component - øvelsespicker */}
      <ØvelsePicker
        availableExercises={availableExercises}
        onSelect={(selected) => setØvelsestype(selected)}/>

      <TextInput style={styles.input}
        placeholder="Repetisjoner"
        keyboardType="numeric"
        value={repetisjoner}
        onChangeText={setRepetisjoner}/>

      <TextInput style={styles.input}
        placeholder="Serier"
        keyboardType="numeric"
        value={serier}
        onChangeText={setSerier}/>

      <TextInput style={styles.input}
        placeholder="Vekt (kg)"
        keyboardType="numeric"
        value={vekt}
        onChangeText={setVekt}/>

      <TouchableOpacity onPress={addExercise}>
        <Text style={styles.loginBtnText}>+ Legg til</Text>
      </TouchableOpacity>

      <ØvelseListe exercises={exercises} remove={removeExercise} />

      <Text style={styles.label}>Tretthet (1-10)</Text>
      <TretthetPicker selectedValue={tretthet} onChange={(value) => setTretthet(value)} />
      <TextInput style={styles.input} placeholder="Kommentar" value={kommentar} onChangeText={setKommentar}/>
      <TouchableOpacity style={styles.exerciseButton} onPress={finishSession}>
        <Text style={styles.exerciseButtonText}>Lagre økt</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TrainingScreen;
