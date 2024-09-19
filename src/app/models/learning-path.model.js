import { sequelize } from "../../config/db.config.js";
import { DataTypes, Model } from "sequelize";
import Course from "./course.model.js";

class LearningPath extends Model {}

LearningPath.init(
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
    modelName: "learningpath",
    tableName: "learning_paths",
    underscored: true,
  }
);

LearningPath.Courses = LearningPath.hasMany(Course, {
  foreignKey: "learningpathId",
  as: "courses",
  keyType: DataTypes.UUID,
});

export default LearningPath;
