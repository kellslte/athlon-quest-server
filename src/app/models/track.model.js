import { sequelize } from "../../config/db.config.js";
import { DataTypes, Model } from "sequelize";
import Course from "./course.model.js";

class Track extends Model {}

Track.init(
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
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: "track",
    tableName: "tracks",
    underscored: true,
  }
);

Track.Courses = Track.hasMany(Course, {
  foreignKey: "trackId",
  as: "courses",
});

export default Track;
