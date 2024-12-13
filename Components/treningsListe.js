import React from 'react';
import { FlatList, View, Text } from 'react-native';
import styles from '../styles/styles';

const TreningsListe = ({ trening }) => {
  return (
  <FlatList data={trening}
      keyExtractor={(item) => item.treningsregistreringID.toString()}
      renderItem={({ item }) => (
        <View style={styles.historyItem}>
          <Text style={styles.detailsText}>
          {item.dato.split('T')[0]} </Text>
          <Text style={styles.detailsText}> 
            {item.vekt}kg, Serier: {item.serier}, Reps: {item.repetisjoner}
            </Text>
          <Text style={styles.detailsText}>Tretthet: {item.tretthet}</Text>
          <Text style={styles.detailsText}>Kommentar: {item.kommentar}</Text>
        </View>
      )}
  />
  );
};

export default TreningsListe;