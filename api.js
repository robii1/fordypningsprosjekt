import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000', 
});

// Hent alle treningsregistreringer
export const getTrainings = async () => {
  try {
    const response = await api.get('/treningsregistrering');
    return response.data;
  } catch (error) {
    console.error('Feil ved henting av treninger:', error);
    throw error;
  }
};

// Legg til en ny treningsregistrering
export const postTraining = async (newTraining) => {
  try {
    const response = await api.post('/treningsregistrering', newTraining);
    return response.data;
  } catch (error) {
    console.error('Feil ved lagring av treningsregistrering:', error);
    throw error;
  }
};

export default api;
