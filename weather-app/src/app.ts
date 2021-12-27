import * as path from 'path';
import * as util from './util';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as hbs from 'hbs';
import { Geocode, Weather } from './util';

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
    if (!req.query.address) {
      res.send({ error: 'You must provide an address.' });
      return;
    }

    const address = req.query.address as string;
    util.geocode(address, (error, geocodeData: Geocode) => {
      if (error) {
        res.send({ error: error.message });
        return;
      }

      const { latitude, longitude, placeName } = geocodeData;
      util.getCurrentWeather(latitude, longitude, (error, data: Weather) => {
        if (error) {
          res.send({ error: error.message });
          return;
        }

        const { temperature, feelslike, description } = data;
        res.send({
          address: placeName,
          temperature,
          feelslike,
          weatherDescription: description,
        });
      });
    });
  });

  app.get('*', (req, res) => {
    res.render('not-found', {
      title: 'Page Not Found',
      errorMessage: 'Sorry mate, try a new route',
    });
  });
};

dotenv.config();
initExpress();
