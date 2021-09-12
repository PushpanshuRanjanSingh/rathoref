const hostname = window.location.host;
const api = {
  platform: 'http://nayakb.toxsl.in/',

  // localhost: 'http://localhost:3040/',
  localhost: "http://192.168.18.10:3000/",
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
