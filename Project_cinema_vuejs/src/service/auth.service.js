import axios from 'axios';

const API_URL = 'http://localhost:8089/api/v1/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        console.log(response.data)
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(userRegister) {
    return axios.post(API_URL + 'register', {
      userName: userRegister.fullName,
      name: userRegister.name,
      email: userRegister.email,
      password: userRegister.password,
      retypePassword: userRegister.confirmPassword,
      phoneNumber: userRegister.phoneNumber
    });
  }
  sendConfifmCodeRegister(userInfor){
    return axios.post(API_URL + 'register',{
      userName: userInfor.fullName,
      name: userInfor.name,
      email: userInfor.email,
      password: userInfor.password,
      retypePassword: userInfor.confirmPassword,
      phoneNumber: userInfor.phoneNumber
    })
  }
  confirmRegister(userRegister, confirmCode) {
    return axios.post(API_URL + 'confirm-register?confirmCode=' + confirmCode, {
      userName: userRegister.fullName.value,
      name: userRegister.name.value,
      email: userRegister.email.value,
      password: userRegister.password.value,
      retypePassword: userRegister.confirmPassword.value,
      phoneNumber: userRegister.phoneNumber.value
    });
  }

}

export default new AuthService();