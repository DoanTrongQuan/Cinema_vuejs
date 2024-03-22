import axios from 'axios';
import authHeader from '../auth-header.js';

const API_URL_FOOD = 'http://localhost:8089/api/v1/food/';

class FoodService {
    getAllFood() {
        return axios.get(API_URL_FOOD + 'get-all-food', { headers:authHeader()})
      }
    
  }
  
  export default new FoodService();