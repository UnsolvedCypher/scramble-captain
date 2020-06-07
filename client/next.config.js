module.exports = {
  env: {
    backend: process.env.SCRAMBLE_CAPTAIN_DOMAIN ? `http://${process.env.SCRAMBLE_CAPTAIN_DOMAIN}:5000` : 'http://localhost:5000',
  },
};
