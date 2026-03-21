import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'projects',
  timestamps: true,
})
export default class Project extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.STRING(255),
  })
  declare projectLink?: string;

  @Column({
    type: DataType.STRING(255),
  })
  declare imageProjectLink?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare status: boolean;
}
