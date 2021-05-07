const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss_promised');

/* fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(passes => console.log(passes)); */
const printDate = data => {
  for (const eachData of data) {
    datetime = new Date(0);
    datetime.setUTCSeconds(eachData.risetime);
    console.log(`Next eachPass at ${datetime} for ${eachData.duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then(data => printDate(data))
  .catch(error => console.log('ERROR!: ', error));