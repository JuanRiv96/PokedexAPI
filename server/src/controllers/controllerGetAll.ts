import { getInfoApi, getInfoDB } from './index';
export const getAllPokemons = async () => {
  const infoApi = await getInfoApi();
  const infoDB = await getInfoDB();
  return [...infoApi, ...infoDB];
};
