import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000', 
});
//______________HENT____________________
// Hent registrerte treninger
export const getAllUsers = async () => {
  try {
    const respon = await api.get('/users');
    return respon.data;
  } catch (error) {
    console.error('Feil ved henting brukere:', error);
    throw error}
};
// Hent registrerte treninger
export const getAllTrainings = async () => {
  try {
    const respon = await api.get('/sessions');
    return respon.data;
  } catch (error) {
    console.error('Feil ved henting treninger:', error);
    throw error}
};

// Hent registrerte øvelse
export const getAllExercises = async () => {
  try {
    const respon = await api.get('/exercises');
    return respon.data;
  } catch (error) {
    console.error('Feil ved henting øvelser:', error);
    throw error}
};

// Hent treningsøkter basert på dato
export const getTrainingsByDate = async (dato) => {
  try {
    const respon = await api.get(`/sessions/dato/${dato}`);
    return respon.data;
  } catch (error) {
    console.error('Feil ved henting av trening dato:', error);
    throw error;
  }
};


//_____________LEGG TIL______________

// Legg til en trening
export const postTraining = async (newTraining) => {
  try {
    const respon = await api.post('/sessions', newTraining);
    return respon.data;
  } catch (error) {
    console.error('Feil ved lagring av treningsregistrering:', error);
    throw error}
};


export default api;
