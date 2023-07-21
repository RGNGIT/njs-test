import StartUserProcessor from './M2-user-processor';
import StartGateway from './M1-gateway';

const services = [
  StartUserProcessor,
  StartGateway
];

services.forEach(async service => {
  await service();
});