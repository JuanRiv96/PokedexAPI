import { Pokemon } from '../models/Pokemon';
import { Type } from '../models/Type';
import { PokemonByNameDB } from '../interfaces';

export const pokemonDbByName = async (name: string): Promise<PokemonByNameDB | undefined> => {
  let pokemon = await Pokemon.findOne({
    where: {
      name: name
    },
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  });
  if (pokemon) {
    return {
      id: pokemon.id,
      name: pokemon.name,
      img: pokemon.img,
      types: pokemon.types.map((type) => type.name),
      attack: pokemon.attack,
      createdInDB: pokemon.createdInDB
    };
  } else {
    return undefined;
  }
};
