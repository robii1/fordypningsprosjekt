import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Oppdatert import

const TrainingScreen = () => {
  const [øvelsestype, setØvelsestype] = useState('');
  const [repetisjoner, setRepetisjoner] = useState('');
  const [serier, setSerier] = useState('');
  const [tretthet, setTretthet] = useState('1'); // Rullegardinverdi for tretthet
  const [kommentar, setKommentar] = useState('');
  const [exercises, setExercises] = useState([]); // Liste over øvelser

  // Funksjon for å legge til en øvelse til listen
  const addExercise = () => {
    const newExercise = {
      id: exercises.length + 1,
      øvelsestype,
      repetisjoner,
      serier,
    };
    setExercises([...exercises, newExercise]);
    setØvelsestype('');
    setRepetisjoner('');
    setSerier('');
  };

  // Funksjon for å lagre økten ved å trykke "Finish"
  const finishSession = () => {
    const newSession = {
      dato: new Date().toISOString().split('T')[0],
      tretthet: parseInt(tretthet),
      kommentar,
      exercises,
    };
    console.log("Økten er lagret:", newSession);

    // Tilbakestill skjema etter lagring
    setExercises([]);
    setTretthet('1');
    setKommentar('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trening</Text>
      
      {/* Inputfelt for å legge til en øvelse */}
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
      <Button title="Legg til øvelse" onPress={addExercise} />

      {/* Vis listen over øvelser */}
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Text style={styles.exerciseText}>{item.øvelsestype}</Text>
            <Text style={styles.exerciseText}>Reps: {item.repetisjoner}, Serier: {item.serier}</Text>
          </View>
        )}
      />

      {/* Rullegardinmeny for tretthet */}
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

      {/* Kommentar */}
      <TextInput
        style={styles.input}
        placeholder="Kommentar"
        placeholderTextColor="#999"
        value={kommentar}
        onChangeText={setKommentar}
      />

      {/* "Finish" knapp for å lagre hele økten */}
      <TouchableOpacity style={styles.finishButton} onPress={finishSession}>
        <Text style={styles.finishButtonText}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#ffd700',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  exerciseItem: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  exerciseText: {
    color: '#00c8ff',
  },
  label: {
    color: '#ffd700',
    fontSize: 16,
    marginTop: 10,
  },
  picker: {
    height: 50,
    color: '#fff',
    backgroundColor: '#333',
    marginBottom: 10,
  },
  finishButton: {
    backgroundColor: '#00c8ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  finishButtonText: {
    color: '#1e1e1e',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TrainingScreen;
