import { ClientError } from '../utils/errors';
import { Request, Response, NextFunction } from 'express';

export const validationID = (req: Request, _res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  if (id) return next();
  else throw new ClientError('id no proporcionado', 400);
};
