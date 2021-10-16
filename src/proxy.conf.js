const PROXY_CONFIG = [
  {
      context: [
          '/sanctum/csrf-cookie',
          '/login',
          '/logout',
          '/api'
      ],
      target: 'http://localhost:8000',
      secure: false,
      logLevel: 'debug'
  }
];

module.exports = PROXY_CONFIG;