import axios from 'axios';
import authHeader from '../auth-header.js';

const API_URL_PROMOTION = 'http://localhost:8089/api/v1/promotion/';

class Promotion {
    getAllPromotion(email) {
        return axios.get(API_URL_PROMOTION + 'get-all-promotion-by-user?email='+ email, { headers:authHeader()})
      }
    getDiscountAmount(voucher,total){
        return axios.get(API_URL_PROMOTION + 
            'get-discount-amount?name=' + voucher + '&totalMoney=' + total,{ headers: authHeader()})
      }
    
  }
  
  export default new Promotion();