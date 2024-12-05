import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/styles';
import TreningKalender from '../Components/treningsKalender';
import ØktListe from '../Components/øktListe';
import { getAllTrainings, getTrainingsByDate } from '../api'; 

const HistoryScreen = () => {
  const [historyData, setHistoryData] = useState([]); // Hentede data
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredSessions, setFilteredSessions] = useState([]); // Data filtrert for valgt dato

  // Hent all treningshistorikk når skjermen får fokus
  useFocusEffect(
    useCallback(() => {
      const fetchHistoryData = async () => {
        try {
          const data = await getAllTrainings();
          setHistoryData(data);
        } catch (error) {
          console.error('Feil ved henting av all treningshistorikk:', error);
        }
      };
      fetchHistoryData();
    }, [])
  );

  // Oppdater filtrerte økter når en dato er valgt
  useEffect(() => {
    if (selectedDate) {
      const fetchFilteredData = async () => {
        try {
          const data = await getTrainingsByDate(selectedDate);
          setFilteredSessions(data);
        } catch (error) {
          console.error('Feil ved henting av treningsøkter:', error);
        }
      };
      fetchFilteredData();
    } else {
      setFilteredSessions([]);
    }
  }, [selectedDate]);

  const markedDates = historyData.reduce((acc, item) => {

const date = item.dato

  
    acc[date] = {
      selected: date === selectedDate,
      marked: true,
      selectedColor: '#00c8ff',
      dotColor: '#00c8ff',
    };
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Treningshistorikk</Text>
      <TreningKalender
        markedDates={markedDates}
        onDayPress={(day) => setSelectedDate(day.dateString)}
      />
      {selectedDate && (
        <Text style={styles.selectedDateText}>Økter for {selectedDate}:</Text>
      )}
      <ØktListe sessions={filteredSessions} />
    </SafeAreaView>
  );
};

export default HistoryScreen;
