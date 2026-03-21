import { Table, Column, Model, DataType, BeforeSave } from 'sequelize-typescript';
import { hash } from 'bcryptjs';

@Table({
  tableName: 'users',
  timestamps: true,
})
export default class User extends Model {
  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare status: boolean;

  @BeforeSave
  static async hashPassword(instance: User) {
    if (instance.changed('password')) {
      const saltRounds = 10;
      instance.password = await hash(instance.password, saltRounds);
    }
  }
}
