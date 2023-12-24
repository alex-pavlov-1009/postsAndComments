import {
  CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';
import sequelize from '../../config/database';

interface IPostModel extends Model<
InferAttributes<IPostModel>,
InferCreationAttributes<IPostModel>
> {
  id: CreationOptional<number>;

  group_id: number;

  text: string;

  created_by: number;

  createdAt: CreationOptional<Date>;

  updatedAt: CreationOptional<Date>;
}

export const PostModel = sequelize.define<IPostModel>(
  'Post',
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    group_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    indexes: [{ unique: true, fields: ['id'] }],
    tableName: 'post',
  },
);
