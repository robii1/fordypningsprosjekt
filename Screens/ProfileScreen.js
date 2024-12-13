import React, { useState, useCallback, useContext } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/styles';
import øvelsesKnapper from '../Components/øvelsesKnapper';
import BarChart from '../Components/barChart';
import TreningsListe from '../Components/treningsListe';
import { getAllTrainings } from '../api';
import { temaKontekst } from '../styles/styles';

const HomeScreen = () => {
  //setter bare knebøy som default
  const [selectedExercise, setSelectedExercise] = useState('Knebøy'); 
  const [exerciseData, setExerciseData] = useState([]);
  const { tema } = useContext(temaKontekst);

  // Hent data når skjermen får fokus
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await getAllTrainings();
          const filtrert = data.filter((session) => session.øvelsestype === selectedExercise);
          setExerciseData(filtrert);
        } catch (error) {
          console.error('Feil', error);
        }
      };
      fetchData();
    }, [selectedExercise])
  );

  const renderBarChart = () => 
    <BarChart
      volumeData={exerciseData.map((item) => ({ ...item,
        totalVolume: item.vekt * item.repetisjoner * item.serier,
      }))}/>

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: tema }]}>
      <Text style={styles.title}>Velg en øvelse</Text>
      <øvelsesKnapper exercises={['Knebøy', 'Markløft', 'Benkpress']} selectedExercise={selectedExercise} onSelect={setSelectedExercise}/>
      {exerciseData.length > 0 ? renderBarChart() : <Text>Ingen data tilgjengelig</Text>}
      <TreningsListe data={exerciseData} />
    </SafeAreaView>
  );
};

export default HomeScreen;

