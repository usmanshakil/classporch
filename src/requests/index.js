/**
 * Created By raffi
 */

import axios from 'axios';
import {apiEndpoints} from '../ApiEndpoints';

const axiosInstance = axios.create({
    baseURL: apiEndpoints.base,
    timeout: 1000,
    headers: {
        'auth-token': localStorage.getItem('authToken')
    }
});

export default axiosInstance