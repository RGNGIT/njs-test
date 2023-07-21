import express from 'express';
import defineRoutes from './routers';
import logger from '../logger';
import bodyParser from "body-parser";

export default async () => {
  require('dotenv').config();

  const {
    API_PORT
  } = process.env;
  
  const app = express();
  const router = express.Router();
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

  defineRoutes(router);

  app.use('/api', router);
  
  app.listen(API_PORT, () => {
    logger.log('message', "Гейтвей запущен. Порт: " + API_PORT, 'M1-gateway');
  })
}