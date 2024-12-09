import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/styles';

const øvelseKnapper = ({ exercises, selectedExercise, onSelect }) => {
  return (
    <View style={styles.buttonContainer}>
      {exercises.map((exercise) => ( //mapper gjennom øvelsene
        <TouchableOpacity
          key={exercise}
          style={[styles.exerciseButton, selectedExercise === exercise && styles.aktivknapp]}
          onPress={() => onSelect(exercise)}>
    
          <Text style={styles.exerciseButtonText}>{exercise}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default øvelseKnapper;
