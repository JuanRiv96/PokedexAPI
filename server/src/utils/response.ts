import { Response } from 'express';
import { PokemonsType, PokemonByNameDB, PokemonByNameApi, DBTypes } from '../interfaces';

export const response = (
  res: Response,
  statusCode: number,
  data: PokemonsType[] | PokemonByNameApi | PokemonByNameDB | DBTypes[] | { message: string }
) => {
  return res.status(statusCode).json({
    error: false,
    data: data
  });
};
