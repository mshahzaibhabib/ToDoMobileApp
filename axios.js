import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://192.168.18.184:3000'
});

export default instance;