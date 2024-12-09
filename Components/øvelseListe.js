import React from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

const ØvelseListe = ({ exercises, onRemove }) => (
  <FlatList
    data={exercises}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={styles.exerciseText}>{item.øvelsestype}</Text>
          <Text style={styles.exerciseText}>
            Reps: {item.repetisjoner}, Serier: {item.serier}, Vekt: {item.vekt}kg
          </Text>
        </View>
        <TouchableOpacity onPress={() => onRemove(item.id)}>
          {/* Lager en enkel X som symboliserer slett*/}
          <Text style={{ color:'red', fontSize: 20 }}>   X</Text>
        </TouchableOpacity>
      </View>
    )}
  />
);

export default ØvelseListe;
