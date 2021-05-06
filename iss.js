const request = require('request');

const fetchMyIP = (callback) => {
  const URL = 'https://api.ipify.org/?format=json';
  request(URL, (error, response, body) => {
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
  const URL = `https://freegeoip.app/json/${ip}`;
  request(URL, (error, response, body) => {
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

const fetchISSFlyOverTimes = (coords, callback) => {
  const URL = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(URL, (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) return callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) return callback(error, null);
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) return callback(error, null);
      fetchISSFlyOverTimes(coords, (error, data) => {
        if (error) return(error, null)
        return callback(null, data)
      });
    });
  });
}

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};