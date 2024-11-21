import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styles from '../styles/styles';

const HistoryScreen = ({ navigation }) => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Hent data fra sessions i dummydata.json
    fetch('http://10.0.2.2:3000/sessions')
      .then((response) => response.json())
      .then((data) => setHistoryData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Markerte datoer for kalender basert på sessions
  const markedDates = historyData.reduce((acc, item) => {
    acc[item.dato] = { selected: true, marked: true, selectedColor: '#00c8ff' };
    return acc;
  }, {});

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DetaljSide', { details: item })}>
      <View style={styles.historyItem}>
        <Text style={styles.dateText}>{item.dato}</Text>
        <Text style={styles.detailsText}>
          {item.øvelsestype} - Varighet: {item.varighet} min - Tretthet: {item.tretthet}
        </Text>
        <Text style={styles.detailsText}>Kommentar: {item.kommentar}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Treningshistorikk</Text>
      
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
        markedDates={markedDates}
      />

      {historyData.length === 0 ? (
        <Text style={styles.noDataText}>Ingen treningsøkter registrert ennå.</Text>
      ) : (
        <FlatList
          data={historyData}
          renderItem={renderItem}
          keyExtractor={(item) => item.treningsregistreringID.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

export default HistoryScreen;
