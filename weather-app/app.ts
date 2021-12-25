import * as weather from './weather';

weather.geocode('Saskatoon', (error, data) => {
  if (!!error) {
    console.log(error.message);
    return;
  } else if (!!data) {
    console.log(data.latitude, data.longitude);
    return;
  }
});
