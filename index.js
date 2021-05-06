// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require("./iss");
/* fetchCoordsByIP('205.250.247.129', (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned Coords:", data);
});  */

/* fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned IP:", ip);
}); */

// fetchISSFlyOverTimes({ latitude: 49.1963, longitude: -122.8106 }, (error, data) => {
//   if (error) return console.log("It didn't work!" , error);
//   console.log('It worked! Returned flyover times:' , data);
// });

const nextISSTimesForMyLocation = require("./iss").nextISSTimesForMyLocation;
nextISSTimesForMyLocation((error, data) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  for (const eachPass of data) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(eachPass.risetime)
    console.log(`Next eachPass at ${datetime} for ${eachPass.duration} seconds!`);
  }
});
