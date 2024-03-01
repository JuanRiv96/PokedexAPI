import { Pokemon } from '../models/Pokemon';
import { Type } from '../models/Type';
import { PokemonsDB } from '../interfaces';

export const getInfoDB = async (): Promise<PokemonsDB[]> => {
  const pokemonDb = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  });
  const pokemonsDB = pokemonDb.map((pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      hp: pokemon.hp,
      attack: pokemon.attack,
      defense: pokemon.defense,
      speed: pokemon.speed,
      height: pokemon.height,
      weight: pokemon.weight,
      img: pokemon.img,
      types: pokemon.types.map((type) => type.name),
      createdInDB: pokemon.createdInDB
    };
  });
  return pokemonsDB;
};
