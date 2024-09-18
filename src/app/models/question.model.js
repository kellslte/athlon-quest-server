import { sequelize } from "../../config/db.config.js";
import { DataTypes, Model } from "sequelize";
import Choice from "./choice.model.js";

class Question extends Model {}

Question.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "question",
    tableName: "questions",
    underscored: true,
  }
);

Question.Choices = Question.hasMany(Choice, {
  foreignKey: "questionId",
  as: "choices",
});

export default Question;
