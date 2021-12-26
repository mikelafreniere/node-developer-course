import * as path from 'path';
import * as util from './util';
import * as yargs from 'yargs';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { Geocode, Weather } from './util';

dotenv.config();

const initExpress = () => {
  const app = express();
  // set path to serve static files
  app.use(express.static(path.join(__dirname, '../public')));
  // set location for frontend templates
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'hbs');

  app.listen(3000, () => {
    console.log('Server is running.');
  });

  // routes
  app.get('', (req, res) => {
    res.render('index', { title: 'Weather' });
  });

  app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
  });

  app.get('/help', (req, res) => {
    res.render('help', { title: 'Help' });
  });

  app.get('/weather', (req, res) => {
    res.send({ forecast: 'forecast' });
  });
};

const initYargs = () => {
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
};

initExpress();
initYargs();
