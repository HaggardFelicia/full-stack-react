import axios from 'axios';

const API = Object.create(null);

API.fetchDirectors = async () => {
    const response = await axios.get('http://localhost:5000/api/v1/directors/');
    console.log(response);
    return response.data;
};

export default API;