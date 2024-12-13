import React, { useState,useContext, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/styles';
import TreningKalender from '../Components/treningsKalender';
import ØktListe from '../Components/øktListe';
import { getAllTrainings, getTrainingsByDate } from '../api'; 
import { temaKontekst } from '../styles/styles'; // konteksten

const HistoryScreen = () => {
  const [historyData, setHistoryData] = useState([]); // Hentede data
  const [valgtDato, setValgtDato] = useState(null);
  const [filteredSessions, setFilteredSessions] = useState([]); // Data filtrert for valgt dato
  const { tema } = useContext(temaKontekst);

  // all treningshistorikk når skjermen får fokus
useFocusEffect(
  useCallback(() => {
    const fetchHistoryData = async () => {
       try {
         const data = await getAllTrainings();
         setHistoryData(data);
      } catch (error) {
         console.error('Feil ved henting treningshistorikk:', error);
      }
    };
    fetchHistoryData();
  }, [])
);

  // Oppdater filtrerte økter når en dato er valgt
useEffect(() => {
  if (valgtDato) {
    const fetchFilteredData = async () => {
      try {
        const data = await getTrainingsByDate(valgtDato);
        setFilteredSessions(data);
      } catch (error) {
        console.error('Feil hentning treningsøkter:', error);
      }
    };
    fetchFilteredData();
  } else { setFilteredSessions([])}
}, [valgtDato]);
 
//Får ikke dato fra database og den som skal være til å matche
// Derfor blir det ikke markert.......
const markertDato = historyData.reduce((acc, item) => {
  const dato = item.dato.split('T')[0]
    acc[dato] = { selected: dato === valgtDato,
      marked: true,
      selectedColor: '##c2b36e',
      dotColor: '#00c8ff',
    };
    return acc;
}, {});

return (
  <SafeAreaView style={[styles.container, { backgroundColor: tema }]}>
    <Text style={styles.title}>Treningshistorikk</Text>
      <TreningKalender
        markedDates={markertDato}
        onDayPress={(day) => setValgtDato(day.dateString)}/>
      
      {valgtDato && (
        <Text style={styles.selectedDateText}>Økter for {valgtDato}:</Text>)}
      <ØktListe sessions={filteredSessions} />
    </SafeAreaView>
  )
};

export default HistoryScreen;
