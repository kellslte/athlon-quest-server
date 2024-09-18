import { sequelize } from "../../config/db.config.js";
import { DataTypes, Model } from "sequelize";
import Resource from "./resource.model.js";

class Lesson extends Model {}

Lesson.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "lesson",
    tableName: "lessons",
    underscored: true,
  }
);

Lesson.Resources = Lesson.hasMany(Resource, {
  foreignKey: "lessonId",
  as: "resources",
});

export default Lesson;
