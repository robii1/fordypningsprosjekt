import React from 'react';
import { FlatList, View, Text } from 'react-native';
import styles from '../styles/styles';

const TreningsListe = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.treningsregistreringID.toString()}
      renderItem={({ item }) => (
        <View style={styles.historyItem}>
          <Text style={styles.detailsText}>
            {item.dato}: {item.vekt}kg, {item.repetisjoner} reps, {item.serier} serier
          </Text>
          <Text style={styles.detailsText}>Tretthet: {item.tretthet}</Text>
          <Text style={styles.detailsText}>Kommentar: {item.kommentar}</Text>
        </View>
      )}
    />
  );
};

export default TreningsListe;