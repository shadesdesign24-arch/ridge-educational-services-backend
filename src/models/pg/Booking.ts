import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';
import { User } from './User';
import { College } from './College';

export class Booking extends Model {
  public id!: number;
  public employeeId!: number;
  public collegeId!: number;
  public studentName!: string;
  public studentEmail!: string;
  public status!: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    collegeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: College,
        key: 'id',
      },
    },
    studentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'CANCELLED'),
      defaultValue: 'PENDING',
    },
  },
  {
    sequelize,
    tableName: 'bookings',
    timestamps: true,
  }
);

Booking.belongsTo(User, { foreignKey: 'employeeId', as: 'employee' });
Booking.belongsTo(College, { foreignKey: 'collegeId', as: 'college' });
