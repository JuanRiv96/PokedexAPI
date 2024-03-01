import { Pokemon } from '../models/Pokemon';
import { Type } from '../models/Type';
import { PokemonsDB } from '../interfaces';
import { SearchError } from '../utils/errors';

export const pokemonDetailDB = async (id: string): Promise<PokemonsDB> => {
  const pokemonDb: Pokemon | null = await Pokemon.findByPk(id, {
    include: {
      model: Type,
      attributes: ['name'],
      through: { attributes: [] }
    }
  });
  if (pokemonDb) {
    return {
      id: pokemonDb.id,
      name: pokemonDb.name,
      hp: pokemonDb.hp,
      attack: pokemonDb.attack,
      defense: pokemonDb.defense,
      speed: pokemonDb.speed,
      height: pokemonDb.height,
      weight: pokemonDb.weight,
      img: pokemonDb.img,
      types: pokemonDb.types.map((type) => type.name),
      createdInDB: pokemonDb.createdInDB
    };
  }
  throw new SearchError('Pokemon not found', 404);
};
