import express, { Application, Response, Request, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import './db';
import router from './routes';

const server: Application = express();

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
server.use('/', router);

// Error catching endware.
interface Error {
  statusCode: number;
  message: string;
}
server.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // eslint-disable-line no-unused-vars
  const status = err.statusCode || 500;
  const message = err.message || err;
  console.error('ESTOY ACA', err);
  res.status(status).json({ error: true, message: message });
});

export default server;
