import axios from 'axios';
import API_ENV from "../../config/api.config";
// import intenseptors
import interseptors from "./interseptors";


const instance = axios.create( {
    baseURL: API_ENV.apiUrl,
    headers: {
        "Content-Type": "application/json"
    }
})

interseptors(instance);

export default instance;