import React, { useState, useCallback } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/styles';
import TreningKalender from '../Components/treningsKalender';
import ØktListe from '../Components/øktListe';

const HistoryScreen = () => {
  const [historyData, setHistoryData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredSessions, setFilteredSessions] = useState([]);

  // Hent data når skjermen får fokus
  useFocusEffect(
    useCallback(() => {
      fetch('http://10.0.2.2:3000/sessions')
        .then((response) => response.json())
        .then((data) => setHistoryData(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, [])
  );

  // Oppdater filtrerte økter når en dato er valgt
  useFocusEffect(
    useCallback(() => {
      if (selectedDate) {
        const filtered = historyData.filter((item) => item.dato === selectedDate);
        setFilteredSessions(filtered);
      }}, [selectedDate, historyData]));

  // datoer for kalender basert på økter
  const markedDates = historyData.reduce((acc, item) => {
    acc[item.dato] = { selected: item.dato === selectedDate, marked: true, selectedColor: '#00c8ff' };
    return acc}, {});


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Treningshistorikk</Text>
      <TreningKalender markedDates={markedDates} onDayPress={(day) => setSelectedDate(day.dateString)} />
      {selectedDate && <Text style={styles.selectedDateText}>Økter for {selectedDate}:</Text>}
      <ØktListe sessions={filteredSessions} />
    </SafeAreaView>
  );
};

export default HistoryScreen;
