import * as request from 'request';
import * as dotenv from 'dotenv';
dotenv.config();

const GET_WEATHER_URL = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=`;
const GET_LOCATION_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${process.env.MAPBOX_API_KEY}&limit=1`;

// request({ url: GET_WEATHER_URL, json: true }, (error, response) => {
//   if (!!error) {
//     console.log('Something went wrong contacting weather service.');
//     return;
//   } else if (!!response.body?.error) {
//     console.log(response.body.error.info);
//     return;
//   }

//   const current = response.body?.current || {};
//   console.log(`It is currently ${current.temperature} degrees out. It feels like ${current.feeslike} degrees out.`);
// });

request({ url: GET_LOCATION_URL, json: true }, (error, response) => {
  if (!!error) {
    console.log('Something went wrong contacting weather service.');
    return;
  } else if (!!response.body?.message) {
    console.log(response.body.message);
    return;
  }

  const feature = response.body.features[0];
  const lat = feature.center[1];
  const long = feature.center[0];
  console.log(lat, long);
});
