import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TrainingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trening</Text>
      {/* Legg til treningskomponenter som timer, øvelser og vektfelt */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#ffd700',
    marginBottom: 20,
  },
});
