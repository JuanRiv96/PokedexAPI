import axios, { AxiosError, isAxiosError } from 'axios';
import { PokemonByNameApi, InfoPokemon } from '../interfaces';

export const pokemonApiByName = async (name: string): Promise<PokemonByNameApi | undefined> => {
  try {
    const pokemonApi = await axios.get<InfoPokemon>(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (pokemonApi.data) {
      return {
        id: pokemonApi.data.id.toString(),
        name: pokemonApi.data.name,
        img: pokemonApi.data.sprites.other.dream_world.front_default,
        types: pokemonApi.data.types.map((el) => el.type.name),
        attack: pokemonApi.data.stats[1].base_stat.toString()
      };
    }
  } catch (error: unknown | AxiosError) {
    if (isAxiosError(error)) return undefined;
  }
};
