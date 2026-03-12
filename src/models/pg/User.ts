import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';

export class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public role!: 'ADMIN' | 'EMPLOYEE';
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('ADMIN', 'EMPLOYEE'),
      allowNull: false,
      defaultValue: 'EMPLOYEE',
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);
