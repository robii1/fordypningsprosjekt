import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Generelle komponenter
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  picker: {
    backgroundColor: '#333',
    color: '#fff',
    marginBottom: 10,
    padding: 10,
    width: '80%', 
  },
  title: {
    fontSize: 24,
    color: '#ffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  exerciseText: {
    fontSize: 12,
    color: '#fff', // Hvit 
  },
  label: {
    color: '#ffff', // Blå
    fontSize: 14,
    marginTop: 20, //
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
    input: {
      backgroundColor: '#333', //  grå bakgrunn
      color: '#fff', // Hvit 
      width: '80%', 
      padding: 12, 
      marginBottom: 15, 
      fontSize: 16, // Større tekst
    },
    loginBTN: {
      backgroundColor: '#4c0966', // lilla
      borderRadius: 20,
      paddingVertical: 12, 
      paddingHorizontal: 25, 
      alignItems: 'center',
      marginTop: 20, //  over knappen
    },
    loginBtnText: {
      color: '#ffffff', 
      fontSize: 16,
    },
    
  // Øvelsesknapper
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  exerciseButton: {
    backgroundColor: '#4c0966',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  aktivknapp: {
    backgroundColor: 'purple'
  },
  exerciseButtonText: {
    color: '#ffff',
    fontSize: 16,
  },

  // Diagram og visuelle data
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 300, //  høyde for diagrammet
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10, // plass til barene
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 3, //  barer
  },
  bar: {
    width: '50%', //  bredde for barene
    borderRadius: 5,
    backgroundColor: '#00c8ff',
  },
  barLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#fff',
  },
  barValue: {
    fontSize: 10,
    color: '#ffd700',
    marginTop: 3,
  },

  // Historikk og liste
  historyItem: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  detailsText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
  selectedDateText: {
    color: '#00c8ff',
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default styles;
