import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany
} from 'sequelize-typescript';
import { Type } from './Type';
import { PokemonType } from './PokemonType';

@Table({
  timestamps: false,
  modelName: 'Pokemon',
  tableName: 'pokemons'
})
export class Pokemon extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  hp!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  attack!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  defense!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  speed!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  height!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  weight!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  img!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  createdInDB!: boolean;

  @BelongsToMany(() => Type, () => PokemonType)
  types!: Type[];
}
