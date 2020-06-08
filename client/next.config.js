module.exports = {
  env: {
    backend: process.env.SCRAMBLE_CAPTAIN_DOMAIN ? `http://${process.env.SCRAMBLE_CAPTAIN_DOMAIN}` : 'http://localhost:3000',
  },
};
