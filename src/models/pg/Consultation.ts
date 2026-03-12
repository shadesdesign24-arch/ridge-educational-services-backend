import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';
import { User } from './User';

export class Consultation extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public interest!: string;
  public type!: string;
  public status!: string;
  public assignedEmployeeId!: number | null;
}

Consultation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    interest: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending', // Pending, Assigned, Completed, Dead Lead
    },
    assignedEmployeeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'consultations',
    timestamps: true,
  }
);

Consultation.belongsTo(User, { foreignKey: 'assignedEmployeeId', as: 'employee' });
User.hasMany(Consultation, { foreignKey: 'assignedEmployeeId', as: 'consultations' });
