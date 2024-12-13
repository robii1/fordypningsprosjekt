import React from 'react';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/styles';

const TretthetPicker = ({ selectedValue, onChange }) => {
  const pickerTall = [];
  //lager en for løkke som går fra 1 til 10
  for (let i = 1; i <= 10; i++) { 
    //pusher de inn
    pickerTall.push(<Picker.Item key={i} label={i.toString()} value={i.toString()} />);
  }
  return (
    <Picker selectedValue={selectedValue} style={styles.picker} onValueChange={onChange}>
      {pickerTall}
    </Picker>
  );
};

export default TretthetPicker;
