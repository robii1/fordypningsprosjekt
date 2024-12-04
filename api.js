import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000', 
});

// Hent alle treningsregistreringer
export const getTrainings = async () => {
  try {
    const respon = await api.get('/treningsregistrering');
    return respon.data;
  } catch (error) {
    console.error('Feil ved henting av treninger:', error);
    throw error}
};

// Legg til en ny treningsregistrering
export const postTraining = async (newTraining) => {
  try {
    const respon = await api.post('/treningsregistrering', newTraining);
    return respon.data;
  } catch (error) {
    console.error('Feil ved lagring av treningsregistrering:', error);
    throw error}
};

export default api;
