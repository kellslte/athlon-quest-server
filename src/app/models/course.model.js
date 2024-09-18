import { sequelize } from "../../config/db.config.js";
import { DataTypes, Model } from "sequelize";
import Section from "./section.model.js";

class Course extends Model {}

Course.init(
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
    description: {
      type: DataTypes.TEXT,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "course",
    tableName: "courses",
    underscored: true,
  }
);

Course.Sections = Course.hasMany(Section, {
  foreignKey: "courseId",
  as: "sections",
});

export default Course;
