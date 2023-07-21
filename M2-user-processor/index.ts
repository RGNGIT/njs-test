import express, { Request, Response } from 'express';
import logger from '../logger';
import BrokerInstance from '../rabbit';
import {userProcessor} from './actions';

export default async () => {
  
  const app = express();

  await BrokerInstance.subscribe('user', userProcessor);

  app.get('*', (req: Request, res: Response) => {
    res.send('MQ_USER_QUEUE_LISTENER');
  })
  
  app.listen(1000, () => {
    logger.log('message', 'Лисенер очереди юзеров запущен', 'M2-user-processor');
  });
}