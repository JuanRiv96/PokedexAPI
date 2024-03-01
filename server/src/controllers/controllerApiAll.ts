import axios from 'axios';
import { PokemonsType, InfoAPI, Result, InfoPokemon } from '../interfaces';

export const getInfoApi = async (): Promise<PokemonsType[]> => {
  let url: string = 'https://pokeapi.co/api/v2/pokemon';
  let pokeData: Result[] = [];

  do {
    let apiInfo = await axios.get<InfoAPI>(url);
    let data: InfoAPI = apiInfo.data;
    let aux = data.results?.map((el) => {
      return {
        name: el.name,
        url: el.url
      };
    });
    pokeData = pokeData.concat(aux);
    url = data.next;
  } while (url != null && pokeData.length < 40);

  const pokemonsApi: PokemonsType[] = await Promise.all(
    pokeData.map(async (el) => {
      const pokemon = await axios.get<InfoPokemon>(el.url);
      return {
        id: pokemon.data.id.toString(),
        name: pokemon.data.name.toString(),
        img: pokemon.data.sprites.other.dream_world.front_default,
        types: pokemon.data.types.map((el) => el.type.name),
        hp: pokemon.data.stats[0].base_stat.toString(),
        attack: pokemon.data.stats[1].base_stat.toString(),
        defense: pokemon.data.stats[2].base_stat.toString(),
        speed: pokemon.data.stats[5].base_stat.toString(),
        height: pokemon.data.height.toString(),
        weight: pokemon.data.weight.toString()
      };
    })
  );
  return pokemonsApi;
};
