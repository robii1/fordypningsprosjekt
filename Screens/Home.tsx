import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Grafen vil være her */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartPlaceholder}>[Graf]</Text>
      </View>

      {/* Boksene for "Feateague" og "Exercise" */}
      <View style={styles.boxContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.boxTitle}>Feateague</Text>
          <Text style={styles.boxContent}>Details...</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.boxTitle}>Exercise</Text>
          <Text style={styles.boxContent}>Details...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  chartContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#333',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartPlaceholder: {
    color: '#888',
    fontSize: 18,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  boxTitle: {
    fontSize: 18,
    color: '#00c8ff',
    marginBottom: 10,
  },
  boxContent: {
    fontSize: 16,
    color: '#fff',
  },
});
