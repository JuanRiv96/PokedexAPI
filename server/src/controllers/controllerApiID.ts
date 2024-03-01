import axios, { AxiosError, isAxiosError } from 'axios';
import { PokemonsType, InfoPokemon } from '../interfaces';
import { SearchError } from '../utils/errors';

export const pokemonDetailApi = async (id: string): Promise<PokemonsType | undefined> => {
  try {
    const apiDetail = await axios.get<InfoPokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(apiDetail.status);
    if (apiDetail.data && apiDetail.status !== 404) {
      const pokemonDetail = {
        id: apiDetail.data.id.toString(),
        name: apiDetail.data.name,
        img: apiDetail.data.sprites.other.dream_world.front_default,
        types: apiDetail.data.types.map((el) => el.type.name),
        hp: apiDetail.data.stats[0].base_stat.toString(),
        attack: apiDetail.data.stats[1].base_stat.toString(),
        defense: apiDetail.data.stats[2].base_stat.toString(),
        speed: apiDetail.data.stats[5].base_stat.toString(),
        height: apiDetail.data.height.toString(),
        weight: apiDetail.data.weight.toString()
      };
      return pokemonDetail;
    }
  } catch (error: unknown | AxiosError) {
    if (isAxiosError(error)) throw new SearchError('Pokemon not found', 404);
  }
};
