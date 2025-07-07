import axios from 'axios';
import { HOST } from './utils/constants.js';

const apiClients= axios.create({
    baseURL: HOST,
    withCredentials: true, // Enable sending cookies with requests  
    })