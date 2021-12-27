import * as request from 'request';

export interface Geocode {
  latitude: number;
  longitude: number;
  placeName: string;
}

export interface Weather {
  temperature: number;
  feelslike: number;
  description: string;
}

export interface Forecast extends Weather {
  placeName: string;
}

const WEATHERSTACK_URL = 'http://api.weatherstack.com';
const MAPBOX_URL = 'https://api.mapbox.com';

export function getCurrentWeather(
  latitude: number,
  longitude: number,
  callback: (error: Error | undefined, data: Weather) => void
): void {
  const query = encodeURIComponent(`${latitude},${longitude}`);
  const GET_WEATHER_URL = `${WEATHERSTACK_URL}/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${query}`;

  request({ url: GET_WEATHER_URL, json: true }, (error, response) => {
    if (!!error || !response.body) {
      callback(new Error('Unable to connect to the weather service.'), {} as Weather);
      return;
    }
    if (response.body.error) {
      callback(new Error(`Unable to find weather for '${query}'. Please try another search.`), {} as Weather);
      return;
    }

    const { temperature, feelslike, weather_descriptions } = response.body.current;
    callback(undefined, {
      temperature,
      feelslike,
      description: weather_descriptions?.length > 0 ? weather_descriptions[0] : '',
    });
  });
}

export function geocode(address: string, callback: (error: Error | undefined, data: Geocode) => void): void {
  const url = `${MAPBOX_URL}/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${
    process.env.MAPBOX_API_KEY
  }&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (!!error || !response.body) {
      callback(new Error('Unable to connect to the location service.'), {} as Geocode);
      return;
    }
    if (!!response.body.message || !(response.body.features?.length > 0)) {
      callback(new Error(`Unable to find '${address}'. Please try another address.`), {} as Geocode);
      return;
    }

    const feature = response.body.features[0];
    callback(undefined, {
      longitude: feature?.center[0] || '',
      latitude: feature?.center[1] || '',
      placeName: feature?.place_name || '',
    } as Geocode);
  });
}
