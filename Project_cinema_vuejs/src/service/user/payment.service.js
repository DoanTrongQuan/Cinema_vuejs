import axios from 'axios';
import authHeader from '../auth-header.js';

const API_URL_PAYMENT = 'http://localhost:8089/api/v1/payment/';

class Payment {
    submidOrder(amount,orderInfo){
        return axios.post(API_URL_PAYMENT + 
            'submitOrder?amount=' + amount + '&orderInfo=' + orderInfo,null, {headers:authHeader()} )
    }
    
  }
  
  export default new Payment();