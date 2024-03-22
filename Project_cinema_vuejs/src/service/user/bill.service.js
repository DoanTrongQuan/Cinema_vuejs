import axios from 'axios';
import authHeader from '../auth-header.js';

const API_URL_BILL = 'http://localhost:8089/api/v1/bill/';

class BillService {
    createBill(email){
        return axios.post(API_URL_BILL + 'create-bill?email=' + email,null, { headers:authHeader()})
    }
    
  }
  
  export default new BillService();