import * as util from './util';
import * as yargs from 'yargs';
import * as dotenv from 'dotenv';
import { Geocode, Weather } from './util';

dotenv.config();
yargs.version('1.0.0');

yargs.command({
  command: 'get',
  describe: 'Get the current weather for a location',
  builder: {
    location: {
      describe: 'The location to get the weather for',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv: { location: string }): void {
    if (!argv.location) {
      console.log('Please specify a location.');
      return;
    }

    util.geocode(argv.location, (error, geocodeData: Geocode) => {
      if (error) {
        console.log(error.message);
        return;
      }

      const { latitude, longitude, placeName } = geocodeData;
      util.getCurrentWeather(latitude, longitude, (error, data: Weather) => {
        if (error) {
          console.log(error.message);
          return;
        }

        const { temperature, feelslike } = data;
        console.log(`The temperature in ${placeName} is ${temperature} degrees. It feels like ${feelslike} degrees.`);
      });
    });
  },
});

yargs.parse();
