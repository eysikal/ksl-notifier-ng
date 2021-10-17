const apiURL = 'http://localhost:8000';
const defaultConfig = {
  target: apiURL,
  secure: false,
  logLevel: 'debug'
};

const PROXY_CONFIG ={
  '/sanctum/csrf-cookie': defaultConfig,
  '/logout': defaultConfig,
  '/api': defaultConfig,
  '/login': {
      target: apiURL,
      secure: false,
      logLevel: 'debug',
      bypass: (request) => {
        if (request.headers.accept.indexOf('html') !== -1) {
            return '/login';
        }
      }
  }
};

module.exports = PROXY_CONFIG;