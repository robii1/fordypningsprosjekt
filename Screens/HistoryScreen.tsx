import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

const HistoryScreen = () => {
  // Eksempeldata for tidligere treningsøkter
  const historyData = [
    { id: '1', date: '2024-11-01', details: 'Cardio og styrketrening' },
    { id: '2', date: '2024-10-29', details: 'Full body workout' },
    { id: '3', date: '2024-10-27', details: 'Kondisjonstrening' },
    // Flere eksempler kan legges til her
  ];

  // Funksjon for å rendere hver treningsøkt
  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.dateText}>{item.date}</Text>
      <Text style={styles.detailsText}>{item.details}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Treningshistorikk</Text>
      
      {/* Kalender */}
      <Calendar
        style={styles.calendar}
        theme={{
          calendarBackground: '#323333',
          dayTextColor: '#fff',
          todayTextColor: '#ffd700',
          selectedDayBackgroundColor: '#333',
          monthTextColor: '#00c8ff',
          arrowColor: '#ffffff',
        }}
        markedDates={{
          '2024-11-01': { selected: true, marked: true, selectedColor: '#00c8ff' },
          '2024-10-29': { selected: true, marked: true, selectedColor: '#00c8ff' },
          '2024-10-27': { selected: true, marked: true, selectedColor: '#00c8ff' },
          // Legg til flere datoer om nødvendig
        }}
      />

      {/* Liste over treningsøkter */}
      <FlatList
        data={historyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    color: '#ffd700',
    textAlign: 'center',
    marginBottom: 10,
  },
  calendar: {
    marginBottom: 20,
    borderRadius: 10,
    paddingBottom: 10,
    width: '90%', 
    alignSelf: 'center',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  historyItem: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  dateText: {
    color: '#00c8ff',
    fontSize: 18,
  },
  detailsText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
});
