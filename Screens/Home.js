import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Picker, FlatList } from 'react-native';
import styles from '../styles/styles';
import { LineChart } from 'react-native-chart-kit'; // For å vise grafen
import { Dimensions } from 'react-native';

const HomeScreen = () => {
  const [selectedExercise, setSelectedExercise] = useState('Knebøy');
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    // Hent dummydata fra API
    fetch('http://10.0.2.2:3000/sessions') // Bruk riktig API URL
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (session) => session.øvelsestype === selectedExercise
        );
        setExerciseData(filteredData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [selectedExercise]);

  const chartData = {
    labels: exerciseData.map((item) => item.dato),
    datasets: [
      {
        data: exerciseData.map((item) => item.vekt),
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Velg en øvelse</Text>
      <Picker
        selectedValue={selectedExercise}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedExercise(itemValue)}
      >
        <Picker.Item label="Knebøy" value="Knebøy" />
        <Picker.Item label="Markløft" value="Markløft" />
        {/* Legg til flere øvelser her */}
      </Picker>

      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width * 0.9}
          height={220}
          chartConfig={{
            backgroundColor: '#333',
            backgroundGradientFrom: '#1e1e1e',
            backgroundGradientTo: '#1e1e1e',
            color: (opacity = 1) => `rgba(0, 200, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          bezier
          style={{
            borderRadius: 16,
          }}
        />
      </View>

      <FlatList
        data={exerciseData}
        keyExtractor={(item) => item.treningsregistreringID.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.detailsText}>
              {item.dato}: {item.vekt}kg, {item.repetisjoner} reps, {item.serier}{' '}
              serier
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
