import * as request from 'request';
import * as dotenv from 'dotenv';
dotenv.config();

export interface Geocode {
  latitude: string;
  longitude: string;
}

const WEATHERSTACK_URL = 'http://api.weatherstack.com';
const MAPBOX_URL = 'https://api.mapbox.com';

export function getCurrentWeather(query: string): void {
  const GET_WEATHER_URL = `${WEATHERSTACK_URL}/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${query}`;

  request({ url: GET_WEATHER_URL, json: true }, (error, response) => {
    if (!!error) {
      console.log('Something went wrong contacting weather service.');
      return;
    } else if (!!response.body?.error) {
      console.log(response.body.error.info);
      return;
    }

    const current = response.body?.current || {};
    console.log(`It is currently ${current.temperature} degrees out. It feels like ${current.feeslike} degrees out.`);
  });
}

export function geocode(
  address: string,
  callback: (error: Error | undefined, data: Geocode | undefined) => void
): void {
  const encodedAddress = encodeURIComponent(address);
  const url = `${MAPBOX_URL}/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${process.env.MAPBOX_API_KEY}&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (!!error) {
      console.log(error);
      callback(new Error('Unable to connect to location services.'), undefined);
      return;
    } else if (!!response.body?.message) {
      callback(new Error(`Unable to find '${address}'. Please try another search.`), undefined);
      return;
    }

    const feature = response.body.features[0];
    callback(undefined, {
      latitude: feature?.center[1] || '',
      longitude: feature?.center[0] || '',
    } as Geocode);
  });
}
