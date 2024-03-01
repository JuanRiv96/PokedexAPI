import { Pokemon } from '../models/Pokemon';
import { Type } from '../models/Type';
import { CreateTypes } from '../interfaces';

export const createPokemon = async (data: CreateTypes): Promise<{ message: string }> => {
  const { name, hp, attack, defense, speed, height, weight, img, types } = data;
  let [pokemonCreate, created] = await Pokemon.findOrCreate({
    where: {
      name: name
    },
    defaults: {
      hp: hp,
      attack: attack,
      defense: defense,
      speed: speed,
      height: height,
      weight: weight,
      img: img
    }
  });
  if (created === false) {
    throw new Error(`El pokemon con nombre ${name} ya fue creado`);
  }
  let type = await Type.findAll({
    where: {
      name: types
    }
  });
  pokemonCreate.$add('Type', type);
  return { message: 'Pokemon creado con exito' };
};
