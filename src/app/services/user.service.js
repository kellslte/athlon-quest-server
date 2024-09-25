import { User } from "../schema/user.schema.js";
import { ConflictError } from "../../lib/errors.js";
import { Profile } from "../schema/profile.schema.js";
import { Address } from "../schema/address.schema.js";

class UserService {
  static async getAllUsers() {
    return await User.find().exec();
  }

  static async getUserById(id) {
    return await User.findById(id).exec();
  }

  static async getUserByEmail(email) {
    return await User.findOne({
      email,
    }).exec();
  }

  static async createUser(payload) {
    const user = await this.getUserByEmail(payload.email);

    if (user) throw new ConflictError("This email has been taken");

    const newUser = await User.create({
      email: payload.email,
      password: payload.password,
      role: payload.role,
    });

    const profile = await Profile.create({
      firstName: payload.firstName,
      lastName: payload.lastName,
      phoneNumber: payload.phoneNumber,
      gender: payload.gender,
    });

    const address = await Address.create({
      country: payload.country,
      street: payload.street,
      city: payload.city,
      state: payload.state,
      zipCode: payload.zipCode,
      primary: payload.primary,
    });

    profile.addresses.push(address._id);
    await profile.save();
    newUser.profile = profile._id;
    await newUser.save();

    return newUser;
  }

  static async updateUser(id, payload) {
    const user = await User.findByIdAndUpdate(id, payload, { new: true });

    return user;
  }

  static async deleteUser(id) {
    await User.findByIdAndDelete(id);
  }

  static async deleteMany() {
    await User.deleteMany();
  }
}

export default UserService;
