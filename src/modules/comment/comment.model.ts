import {
  CreationOptional,
  DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';
import sequelize from '../../config/database';
import { PostModel } from '../post/post.model';

export interface ICommentModel extends Model<
InferAttributes<ICommentModel>,
InferCreationAttributes<ICommentModel>
> {
  id: CreationOptional<number>;

  post_id: ForeignKey<number>;

  text: string;

  created_by: number;

  createdAt: CreationOptional<Date>;

  updatedAt: CreationOptional<Date>;
}

export const CommentModel = sequelize.define<ICommentModel>(
  'Comment',
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.STRING,
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
    tableName: 'comment',
  },
);

PostModel.hasMany(CommentModel, {
  foreignKey: {
    name: 'post_id',
  },
});
