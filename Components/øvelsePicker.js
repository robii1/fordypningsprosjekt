import React from 'react';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/styles';

const ØvelsePicker = ({ availableExercises, onSelect }) => (
  <Picker
    style={styles.picker}
    onValueChange={onSelect}>
    <Picker.Item label="Velg øvelse" value="" />
    {availableExercises.map((exercise) => (
      // Går gjennom øvelsene i databasen
      <Picker.Item key={exercise.øvelseID} label={exercise.navn} value={exercise.navn} />
    ))}
  </Picker>
);

export default ØvelsePicker;
