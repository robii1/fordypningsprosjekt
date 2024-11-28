import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styles from '../styles/styles';

const HistoryScreen = () => {
  const [historyData, setHistoryData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredSessions, setFilteredSessions] = useState([]);

  useEffect(() => {
    // Hent data fra sessions i dummydata.json
    fetch('http://10.0.2.2:3000/sessions')
      .then((response) => response.json())
      .then((data) => setHistoryData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (selectedDate) {
      // Filtrer økter for den valgte datoen
      const filtered = historyData.filter((item) => item.dato === selectedDate);
      setFilteredSessions(filtered);
    }
  }, [selectedDate, historyData]);

  // Markerte datoer for kalender basert på sessions
  const markedDates = historyData.reduce((acc, item) => {
    acc[item.dato] = { selected: item.dato === selectedDate, marked: true, selectedColor: '#00c8ff' };
    return acc;
  }, {});

  const renderSessionDetails = () => {
    if (filteredSessions.length === 0) {
      return <Text>Ingen økter for denne datoen.</Text>;
    }

    return (
      <FlatList
        data={filteredSessions}
        keyExtractor={(item) => item.treningsregistreringID.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.dateText}>{item.dato}</Text>
            <Text style={styles.detailsText}>Øvelse: {item.øvelsestype}</Text>
            <Text style={styles.detailsText}>
              Vekt: {item.vekt}kg, {item.repetisjoner} reps, {item.serier} serier
            </Text>
            <Text style={styles.detailsText}>Tretthet: {item.tretthet}</Text>
            <Text style={styles.detailsText}>Kommentar: {item.kommentar}</Text>
          </View>
        )}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Treningshistorikk</Text>

      <Calendar
        style={styles.calendar}
        theme={{
          calendarBackground: '#323333',
          dayTextColor: '#fff',
          todayTextColor: '#ffd700',
          selectedDayBackgroundColor: '#00c8ff',
          monthTextColor: '#00c8ff',
          arrowColor: '#fff',
        }}
        markedDates={markedDates}
        onDayPress={(day) => setSelectedDate(day.dateString)}
      />

      {selectedDate && (
        <Text style={styles.selectedDateText}>
          Økter for {selectedDate}:
        </Text>
      )}
      {renderSessionDetails()}
    </SafeAreaView>
  );
};

export default HistoryScreen;
