import axios from 'axios';

const baseUrl = 'https://comic-dance-club-api.herokuapp.com';

const fetchDataClasses = async () => {
  try {
    const response = await axios.get(`${baseUrl}/classes/`);
    return response.data;
  } catch (e) {
    throw e.toString();
  }
};

export const fetchSingleClasses = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/classes/${id}`);
    return response.data;
  } catch (e) {
    throw e.toString();
  }
};

export default fetchDataClasses;
