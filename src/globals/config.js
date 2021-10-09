const hostname = window.location.host;
const api = {
  localhost: 'https://rathorebackend.herokuapp.com/',

  // localhost: 'http://localhost:3001/',
  // localhost: 'http://192.168.18.10:3001/',
};

let apiBase = '';
if (
  hostname === 'localhost' ||
  hostname === '192.168.2.122' ||
  hostname == 'localhost:3000'
) {
  apiBase = api.localhost;
} else {
  apiBase = api.localhost;
}
export default apiBase;
