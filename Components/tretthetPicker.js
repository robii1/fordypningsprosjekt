import React from 'react';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/styles';

const TretthetPicker = ({ selectedValue, onChange }) => (
  <Picker
    selectedValue={selectedValue}
    style={styles.picker}
    onValueChange={onChange}
  >
    {[...Array(10).keys()].map((i) => (
      <Picker.Item key={i + 1} label={(i + 1).toString()} value={(i + 1).toString()} />
    ))}
  </Picker>
);

export default TretthetPicker;
