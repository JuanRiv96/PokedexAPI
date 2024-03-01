import { Model, Column, Table, ForeignKey } from 'sequelize-typescript';
import { Pokemon } from './Pokemon';
import { Type } from './Type';

@Table({
  timestamps: false,
  modelName: 'PokemonType',
  tableName: 'pokemon_types'
})
export class PokemonType extends Model<PokemonType> {
  @ForeignKey(() => Pokemon)
  @Column
  typeId!: number;

  @ForeignKey(() => Type)
  @Column
  pokemonId!: number;
}
