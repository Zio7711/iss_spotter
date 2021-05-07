const request = require('request-promise-native');
const fetchMyIP = () => request('https://api.ipify.org?format=json');
const fetchCoordsByIP = (myip) => { 
  const parsedBody = JSON.parse(myip);
  const ip = parsedBody.ip;
  return request(`https://freegeoip.app/json/${ip}`);
};
const fetchISSFlyOverTimes = (coords) => {
  const parsedBody = JSON.parse(coords);
  const longitude = parsedBody.longitude;
  const latitude = parsedBody.latitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(body => {
      const parsedData = JSON.parse(body).response;
      return parsedData;
    })
    .catch(error => console.log("ERROR!: ", error));
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };