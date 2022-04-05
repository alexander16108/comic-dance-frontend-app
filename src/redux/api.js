import axios from 'axios';

const baseUrl = 'https://comic-dance-club.herokuapp.com';

const fetchDataClasses = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/dances`);
    return response.data;
  } catch (e) {
    throw e.toString();
  }
};

export const fetchSingleClasses = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/api/dances${id}`);
    return response.data;
  } catch (e) {
    throw e.toString();
  }
};

export default fetchDataClasses;
