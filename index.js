const { fetchMyIP, fetchCoordsByIP } = require("./iss");

fetchCoordsByIP('205.250.247.129', (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned Coords:", data);
});

/* fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned IP:", ip);
}); */

