const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const parsedBody = JSON.parse(body);
    const IP = parsedBody.ip;
    return callback(null, IP);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request("https://freegeoip.app/json/", (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coords. Response: ${body}`;
      return callback(Error(msg), null);
    }
    const latitude = JSON.parse(body).latitude;
    const longitude = JSON.parse(body).longitude;
    const Coords = {
      latitude,
      longitude
    };
    return callback(null, Coords);
  });
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};