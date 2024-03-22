
export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.token) {
      const headers = { Authorization: 'Bearer ' + user.token };
      console.log('AccessToken:', user.token);
      return headers;
    } else {
      console.log('No AccessToken found.');
      return {};
    }
  }
  