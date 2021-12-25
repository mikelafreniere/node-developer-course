import * as util from './util';
import * as yargs from 'yargs';
import * as dotenv from 'dotenv';
dotenv.config();
yargs.version('1.1.0');

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
    util.geocode(argv.location, (error, geocodeData) => {
      if (error) {
        console.log(error.message);
        return;
      }

      util.getCurrentWeather(geocodeData!.latitude, geocodeData!.longitude, (error, data) => {
        if (error) {
          console.log(error.message);
          return;
        }
        console.log(
          `The temperature in ${geocodeData!.placeName} is ${data!.temperature} degrees. It feels like ${
            data!.feelsLike
          } degrees.`
        );
      });
    });
  },
});

yargs.parse();
