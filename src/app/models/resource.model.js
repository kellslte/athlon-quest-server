import { sequelize } from "../../config/db.config.js";
import { DataTypes, Model } from "sequelize";

class Resource extends Model {}

Resource.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
        notEmpty: true,
      },
    },
    type: {
      type: DataTypes.ENUM("video", "audio", "document"),
      defaultValue: "document",
    },
  },
  {
    sequelize,
    modelName: "resource",
    tableName: "resources",
    underscored: true,
  }
);

export default Resource;
