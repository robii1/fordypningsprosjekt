import React from 'react';
import { Calendar } from 'react-native-calendars';
import styles from '../styles/styles';

const TreningKalender = ({ markertDato, onDayPress }) => {
  return (
    <Calendar
      style={styles.calendar}
      theme={{
        monthTextColor: '#00c8ff',
        arrowColor: '#fff',
        calendarBackground: '#323333',
        dayTextColor: '#fff',
        todayTextColor: '#ffd700',
        selectedDayBackgroundColor: '#00c8ff',
      
      }}
      markingType="multi-dot"
      markedDates={markertDato}
      onDayPress={onDayPress}
    />
  );
};

export default TreningKalender;
