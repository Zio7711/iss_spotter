const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

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

fetchISSFlyOverTimes({ latitude: 49.1963, longitude: -122.8106 }, (error, data) => {
  if (error) return console.log("It didn't work!" , error);
  console.log('It worked! Returned flyover times:' , data);
});
