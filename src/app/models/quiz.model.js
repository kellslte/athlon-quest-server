import { sequelize } from "../../config/db.config.js";
import { DataTypes, Model } from "sequelize";
import Question from "./question.model.js";

class Quiz extends Model {}

Quiz.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "quiz",
    tableName: "quizzes",
    underscored: true,
  }
);

Quiz.Questions = Quiz.hasMany(Question, {
  foreignKey: "quizId",
  as: "questions",
});

export default Quiz;
