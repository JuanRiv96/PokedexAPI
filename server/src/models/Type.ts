import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany
} from 'sequelize-typescript';
import { Pokemon } from './Pokemon';
import { PokemonType } from './PokemonType';

@Table({
  timestamps: false,
  modelName: 'Type',
  tableName: 'types'
})
export class Type extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @BelongsToMany(() => Pokemon, () => PokemonType)
  pokemons?: Pokemon[];
}
