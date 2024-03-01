import { Router, Request, Response } from 'express';
import { getAllPokemons, pokemonApiByName, pokemonDbByName, pokemonDetailApi, pokemonDetailDB, getTypes, createPokemon } from '../controllers';
import { SearchError } from '../utils/errors';
import { response, catchAsync } from '../utils';
import { validationID, validationCreate } from '../middlewares';
import { CreateTypes } from '../interfaces';
const router: Router = Router();

router.get(
  '/pokedex',
  catchAsync(async (req: Request, res: Response) => {
    const name = req.query.name as string;
    if (name) {
      const apiRes = await pokemonApiByName(name);
      if (apiRes) return response(res, 200, apiRes);
      const dbRes = await pokemonDbByName(name);
      if (dbRes) return response(res, 200, dbRes);
      throw new SearchError('Pokemon not Found', 400);
    } else {
      const allPokemons = await getAllPokemons();
      console.log(allPokemons);
      return response(res, 200, allPokemons);
    }
  })
);

router.get(
  '/pokedex/:id',
  validationID,
  catchAsync(async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi; // Regular Function to validate UUID number.
    if (regexExp.test(id)) {
      const dbRes = await pokemonDetailDB(id);
      if (dbRes) return response(res, 200, dbRes);
    }
    const apiRes = await pokemonDetailApi(id);
    if (apiRes) return response(res, 200, apiRes);
  })
);

router.get(
  '/types',
  catchAsync(async (req: Request, res: Response) => {
    const types = await getTypes();
    return response(res, 200, types);
  })
);

router.post(
  '/pokedex/create',
  validationCreate,
  catchAsync(async (req: Request, res: Response) => {
    const data: CreateTypes = req.body;
    const createdPokemon = await createPokemon(data);
    return response(res, 200, createdPokemon);
  })
);
export default router;
