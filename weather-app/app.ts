import * as util from './util';
import * as dotenv from 'dotenv';
dotenv.config();

util.geocode('Saskatoon', (error, data) => {
  if (!!error) {
    console.log(error.message);
    return;
  } else if (!!data) {
    console.log(data.latitude, data.longitude);
    return;
  }
});

util.getCurrentWeather(52.131802, -106.660767, (error, data) => {
  if (!!error) {
    console.log(error.message);
    return;
  } else if (!!data) {
    console.log(data.temperature, data.feelsLike);
    return;
  }
});
