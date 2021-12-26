import * as path from 'path';
import * as util from './util';
import * as yargs from 'yargs';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as hbs from 'hbs';
import { Geocode, Weather } from './util';

dotenv.config();

const initExpress = () => {
  const app = express();
  // set path to serve static files
  app.use(express.static(path.join(__dirname, '../public')));
  // set location for frontend templates
  app.set('views', path.join(__dirname, '../templates/views'));
  hbs.registerPartials(path.join(__dirname, '../templates/partials'));
  app.set('view engine', 'hbs');

  app.listen(3000, () => {
    console.log('Server is running.');
  });

  // routes
  app.get('', (req, res) => {
    res.render('index', {
      title: 'Weather',
      name: 'Mike LaFreniere',
    });
  });

  app.get('/about', (req, res) => {
    res.render('about', {
      title: 'About',
      name: 'Mike LaFreniere',
    });
  });

  app.get('/help', (req, res) => {
    res.render('help', {
      title: 'Help',
      name: 'Mike LaFreniere',
    });
  });

  app.get('/weather', (req, res) => {
    res.send({ forecast: 'forecast' });
  });

  // 404 routes
  app.get('/help/*', (req, res) => {
    res.render('not-found', {
      title: 'Help Article Not Found',
      errorMessage: 'Sorry mate, try a new route',
    });
  });

  app.get('*', (req, res) => {
    res.render('not-found', {
      title: 'Page Not Found',
      errorMessage: 'Sorry mate, try a new route',
    });
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
