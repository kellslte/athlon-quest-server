import { sequelize } from "../../config/db.config.js";
import { DataTypes, Model } from "sequelize";

class Choice extends Model {}

Choice.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "choice",
    tableName: "choices",
    underscored: true,
    paranoid: false,
    defaultScope: {
      attributes: { exclude: ["deletedAt"] },
    },
  }
);

export default Choice;
