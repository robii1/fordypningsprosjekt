import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

const BarChart = ({ volumeData }) => {
  const maxVolume = Math.max(...volumeData.map((item) => item.totalVolume), 0)
  //hvis volum = 0 returner teksten
  if (maxVolume === 0) 
    return <Text>Ingen data tilgjengelig</Text>;

  const chartHeight = 240; // Maks høyde på containeren
  return (
    <View style={styles.chartContainer}>
      {volumeData.map((item, index) => (
        <View key={index} style={styles.barContainer}>
          <View style={[ styles.bar,{ height: (item.totalVolume / maxVolume) * chartHeight }]}/>
          <Text style={styles.barLabel}>{item.dato.split('T')[0]}</Text>
          <Text style={styles.barValue}>{item.totalVolume}kg</Text>
        </View>
      ))}
    </View>
  );
};

export default BarChart;
