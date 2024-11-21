import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    barContainer: {
      alignItems: 'center',
      marginHorizontal: 5,
    },
    bar: {
      width: 20,
      backgroundColor: '#00c8ff',
      borderRadius: 5,
      marginBottom: 5,
    },
    barLabel: {
      color: '#fff',
      fontSize: 12,
    },
    exerciseButton: {
      backgroundColor: '#333',
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    selectedButton: {
      backgroundColor: '#00c8ff',
    },
    exerciseButtonText: {
      color: '#fff',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    exerciseButton: {
      backgroundColor: '#333',
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 5,
    },
    selectedButton: {
      backgroundColor: '#00c8ff',
    },
    exerciseButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  exerciseItem: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  exerciseText: {
    color: '#00c8ff',
  },
  label: {
    color: '#ffd700',
    fontSize: 16,
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: '30%', // Full bredde
    color: '#fff',
    backgroundColor: '#333',
    marginBottom: 10,
    borderRadius: 5,
  },
  finishButton: {
    backgroundColor: '#00c8ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  finishButtonText: {
    color: '#1e1e1e',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  chartContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#333',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartPlaceholder: {
    color: '#888',
    fontSize: 18,
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
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    height: 120,
  },
  boxTitle: {
    fontSize: 18,
    color: '#00c8ff',
    marginBottom: 10,
  },
  boxContent: {
    fontSize: 16,
    color: '#fff',
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
  dateText: {
    color: '#00c8ff',
    fontSize: 18,
  },
  detailsText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
  noDataText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default styles;
