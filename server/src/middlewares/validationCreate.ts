import { ClientError } from '../utils/errors';
import { Request, Response, NextFunction } from 'express';
import { CreateTypes } from '../interfaces';

export const validationCreate = (req: Request, _res: Response, next: NextFunction) => {
  const { name, hp, attack, defense, speed, height, weight, img, types }: CreateTypes = req.body;
  if (!name || !hp || !attack || !defense || !speed || !height || !weight || !img || !types) {
    throw new ClientError('Datos incompletos', 400);
  } else {
    return next();
  }
};
