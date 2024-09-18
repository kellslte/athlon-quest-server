import { sequelize } from "../../config/db.config.js";
import { DataTypes, Model } from "sequelize";
import Lesson from "./lesson.model.js";
import Quiz from "./quiz.model.js";

class Section extends Model {}

Section.init(
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
    modelName: "section",
    tableName: "sections",
    underscored: true,
  }
);

Section.Lessons = Section.hasMany(Lesson, {
  foreignKey: "sectionId",
  as: "lessons",
});

Section.Quiz = Section.hasOne(Quiz, {
  foreignKey: "sectionId",
  as: "quiz",
});

export default Section;
