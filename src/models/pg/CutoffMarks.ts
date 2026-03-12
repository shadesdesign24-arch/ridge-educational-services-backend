import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';
import { College } from './College';

export class CutoffMarks extends Model {
  public id!: number;
  public collegeId!: number;
  public courseName!: string;
  public category!: string; // 'General', 'OBC', 'SC/ST', etc.
  public minimumCutoff!: number; // Percentage or rank depending on the metric
  public readonly college?: College;
}

CutoffMarks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    collegeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: College,
        key: 'id',
      },
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minimumCutoff: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'cutoff_marks',
    timestamps: true,
  }
);

// Define Associations
College.hasMany(CutoffMarks, { foreignKey: 'collegeId', as: 'cutoffs' });
CutoffMarks.belongsTo(College, { foreignKey: 'collegeId', as: 'college' });
