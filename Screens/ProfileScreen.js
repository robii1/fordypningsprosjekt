import React, { useState, useCallback } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/styles';
import øvelsesKnapper from '../Components/øvelsesKnapper';
import BarChart from '../Components/barChart';
import TreningsListe from '../Components/treningsListe';

const HomeScreen = () => {
  const [selectedExercise, setSelectedExercise] = useState('Knebøy');
  const [exerciseData, setExerciseData] = useState([]);
  const exercises = ['Knebøy', 'Markløft', 'Benkpress']; // Øvelsesalternativer

  // Hent data når skjermen får fokus
  useFocusEffect(
    useCallback(() => {
      fetch('http://10.0.2.2:3000/sessions')
        .then((response) => response.json())
        .then((data) => {
          const filteredData = data.filter(
            (session) => session.øvelsestype === selectedExercise
          );
          setExerciseData(filteredData);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }, [selectedExercise]) // Oppdater data når valgt øvelse endres
  );

  const renderBarChart = () => 
  <BarChart
  volumeData={exerciseData.map((item) => ({
    ...item,
    totalVolume: item.vekt * item.repetisjoner * item.serier,
  }))}
/>
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Velg en øvelse</Text>
      <øvelsesKnapper exercises={exercises} selectedExercise={selectedExercise} onSelect={setSelectedExercise}/>

      {exerciseData.length > 0 ? renderBarChart() : <Text>Ingen data tilgjengelig</Text>}

      <TreningsListe data={exerciseData} />
    </SafeAreaView>
  );
};

export default HomeScreen;
