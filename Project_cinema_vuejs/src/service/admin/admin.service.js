import axios from 'axios';
import authHeader from '../auth-header.js';

const API_URL = 'http://localhost:8088/api/v1/users/';
const API_URL_COURSE ='http://localhost:8088/api/v1/course/';
const API_URL_POST = 'http://localhost:8088/api/v1/post/'


class AdminService {

  getAllUser(numberPageAndPageSize) {
    return axios.get(API_URL + 'getAllUser', {
      params: {
        pageNumber: numberPageAndPageSize.page,
        limit: numberPageAndPageSize.usersPerPage,
      },
      headers: authHeader()
    }).then(response => {
      return response.data;
    });
  }

  getTotalUserCount(){
    return axios.get(API_URL + 'total-user-count', { headers: authHeader() })
  }
  getTotalUserLocked() {
    return axios.get(API_URL + 'total-user-locked', { headers: authHeader() })
  }
  getTotalCourseCount() {
    return axios.get(API_URL_COURSE + 'total-course-count', { headers: authHeader() })
  }
  getTotalPostCount() {
    return axios.get(API_URL_POST + 'total-post-count', { headers: authHeader()})
  }
  lockUser(userid) {
    return axios.put(API_URL + 'lock-user', null, {
      params: { userID: userid },
      headers: authHeader()
    })
  }
  
  
}

export default  new AdminService();