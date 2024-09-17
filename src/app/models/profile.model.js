import { DataTypes, Model } from "sequelize";
import Address from "./address.model.js";
import { sequelize } from "../../config/db.config.js";

class Profile extends Model {}

Profile.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "profile",
    tableName: "profiles",
    timestamps: false,
    paranoid: true,
  }
);

Profile.addresses = Profile.hasMany(Address, {
  foreignKey: "profileId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "addresses",
});

export default Profile;
