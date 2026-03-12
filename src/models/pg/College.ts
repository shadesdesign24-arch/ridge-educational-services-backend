import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';

export class College extends Model {
  public id!: number;
  public name!: string;
  public location!: string;
  public description!: string;
  public website!: string;
  public logo!: string;
  public yearWiseFees!: any; // Storing array of { year: number, amount: string }
  public admissionFee!: string;
  public healthCardFee!: string;
  public applicationFee!: string;
}

College.init(
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
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    yearWiseFees: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    admissionFee: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    healthCardFee: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    applicationFee: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'colleges',
    timestamps: true,
  }
);
