import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db.config.js";
import Profile from "./profile.model.js";
import argon from "argon2";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    role: {
      type: DataTypes.ENUM("admin", "teacher", "student"),
      allowNull: false,
      defaultValue: "student",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "users",
    hooks: {
      beforeCreate: async function (user, options) {
        user.password = await argon.hash(user.password);
      },
    },
  }
);

User.profile = User.hasOne(Profile, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default User;
