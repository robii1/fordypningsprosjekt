import React from 'react';
import { FlatList, View, Text } from 'react-native';
import styles from '../styles/styles';

const ØktListe = ({ sessions }) => {
  if (sessions.length === 0) { //Dersom sessions er lik 0
    return <Text style={styles.label}>Du har ingen økter denne datoen</Text>};

  return (
    <FlatList
      data={sessions}
      keyExtractor={(item) => item.treningsregistreringID.toString()}
      renderItem={({ item }) => (
        <View style={styles.historyItem}>
          <Text style={styles.detailsText}>{new Date(item.dato).toISOString().split('T')[0]}</Text>
          <Text style={styles.detailsText}>Øvelse: {item.øvelsestype}</Text>
          <Text style={styles.detailsText}>
            Vekt: {item.vekt}kg, Serier: {item.serier}, Reps: {item.repetisjoner}
          </Text>
          <Text style={styles.detailsText}>Tretthet: {item.tretthet}</Text>
          <Text style={styles.detailsText}>Kommentar: {item.kommentar}</Text>
        </View>
      )}/>
  );
};

export default ØktListe;
