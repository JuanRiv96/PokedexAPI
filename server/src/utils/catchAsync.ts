import { Request, Response, NextFunction } from 'express';

export const catchAsync = (fn: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>) => {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res).catch((err: unknown) => {
      next(err);
    });
  };
};
