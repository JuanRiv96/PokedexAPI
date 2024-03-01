import axios from 'axios';
import { Type } from '../models/Type';
import { Types, DBTypes } from '../interfaces';

export const getTypes = async (): Promise<DBTypes[]> => {
  const typesDB = await Type.findAll();
  if (!typesDB.length) {
    const apiTypes = await axios.get<Types>('https://pokeapi.co/api/v2/type');
    let types = apiTypes.data.results.map((el) => {
      return { name: el.name };
    });
    await Type.bulkCreate(types);
    const createdTypes = await Type.findAll();
    return createdTypes;
  }
  return typesDB;
};
