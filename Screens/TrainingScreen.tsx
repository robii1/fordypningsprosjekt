import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const TrainingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header for øvelser */}
      <Text style={styles.title}>Dagens Økt</Text>

      {/* Plassholdere for øvelser */}
      <View style={styles.exerciseContainer}>
        <View style={styles.exerciseBox}>
          <Text style={styles.exerciseText}>Øvelse 1</Text>
        </View>
        <View style={styles.exerciseBox}>
          <Text style={styles.exerciseText}>Øvelse 2</Text>
        </View>
        {/* Legg til flere øvelsesbokser her om nødvendig */}
      </View>

      {/* Knapp for å legge til ny øvelse */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Legg til øvelse</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TrainingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    color: '#ffd700',
    marginBottom: 20,
  },
  exerciseContainer: {
    flex: 1,
    width: '80%',
  },
  exerciseBox: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  exerciseText: {
    color: '#00c8ff',
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#00c8ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  addButtonText: {
    color: '#1e1e1e',
    fontSize: 16,
  },
});
