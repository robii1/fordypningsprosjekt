import React from 'react';
import { Calendar } from 'react-native-calendars';
import styles from '../styles/styles';

const TreningKalender = ({ markedDates, onDayPress }) => {
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
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
};

export default TreningKalender;
