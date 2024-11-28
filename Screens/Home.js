import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

const HomeScreen = () => {
  const [selectedExercise, setSelectedExercise] = useState('Knebøy');
  const [exerciseData, setExerciseData] = useState([]);
  const exercises = ['Knebøy', 'Markløft', 'Benkpress']; // Øvelsesalternativer

  useEffect(() => {
    // Hent dummydata fra API
    fetch('http://10.0.2.2:3000/sessions') // Bruk riktig 
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (session) => session.øvelsestype === selectedExercise
        );
        setExerciseData(filteredData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [selectedExercise]);

  const renderBarChart = () => {
    // Beregn totalt volum (vekt * repetisjoner * serier) for hver økt
    const volumeData = exerciseData.map((item) => ({
      ...item,
      totalVolume: item.vekt * item.repetisjoner * item.serier,
    }));
  
    // Finn maks volum for skalering
    const maxVolume = Math.max(...volumeData.map((item) => item.totalVolume), 0);
  
    if (maxVolume === 0) return <Text>Ingen data tilgjengelig</Text>;
  
    const chartHeight = 250; // Maks høyde på containeren
  
    return (
      <View style={styles.chartContainer}>
        {volumeData.map((item, index) => (
          <View key={index} style={styles.barContainer}>
            <View
              style={[
                styles.bar,
                {
                  height: (item.totalVolume / maxVolume) * chartHeight, // Skaler høyden basert på totalt volum
                },
              ]}
            />
            <Text style={styles.barLabel}>{item.dato}</Text>
            <Text style={styles.barValue}>{item.totalVolume}kg</Text>
          </View>
        ))}
      </View>
    );
  };
  
  
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Velg en øvelse</Text>

      {/* Øvelsesknapper */}
      <View style={styles.buttonContainer}>
        {exercises.map((exercise) => (
          <TouchableOpacity
            key={exercise}
            style={[
              styles.exerciseButton,
              selectedExercise === exercise && styles.selectedButton,
            ]}
            onPress={() => setSelectedExercise(exercise)}
          >
            <Text style={styles.exerciseButtonText}>{exercise}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Enkel stolpediagram */}
      {exerciseData.length > 0 ? renderBarChart() : <Text>Ingen data tilgjengelig</Text>}

      <FlatList
  data={exerciseData}
  keyExtractor={(item) => item.treningsregistreringID.toString()}
  renderItem={({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.detailsText}>
        {item.dato}: {item.vekt}kg, {item.repetisjoner} reps, {item.serier} serier
      </Text>
      <Text style={styles.detailsText}>Tretthet: {item.tretthet}</Text>
      <Text style={styles.detailsText}>Kommentar: {item.kommentar}</Text>
    </View>
  )}
/>

    </SafeAreaView>
  );
};

export default HomeScreen;
