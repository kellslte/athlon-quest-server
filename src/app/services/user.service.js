import User from "../models/user.model.js";
import { ConflictError, NotFoundError } from "../../lib/errors.js";
import Profile from "../models/profile.model.js";
import Address from "../models/address.model.js";

class UserService {
  static async getAllUsers() {
    return await User.findAll();
  }

  static async getUserById(id) {
    return await User.findByPk(id);
  }

  static async getUserByEmail(email) {
    return await User.findOne({
      where: {
        email,
      },
    });
  }

  static async createUser(payload) {
    const user = await this.getUserByEmail(payload.email);

    if (user) throw new ConflictError("This email has been taken");

    const newUser = await User.create(
      {
        email: payload.email,
        password: payload.password,
        role: payload.role,
        profile: {
          firstName: payload.firstName,
          lastName: payload.lastName,
          phoneNumber: payload.phoneNumber,
          addresses: [
            {
              country: payload.country,
              street: payload.street,
              city: payload.city,
              state: payload.state,
              zipCode: payload.zipCode,
              primary: payload.primary,
            },
          ],
        },
      },
      {
        include: [
          {
            association: User.profile,
            include: [Profile.addresses],
          },
        ],
      }
    );

    return newUser;
  }

  static async updateUser(id, userData) {
    const user = await this.getUserById(id);

    if (!user) throw new NotFoundError("The user record does not exist");

    await user.update(userData);

    return user;
  }

  static async deleteUser(id) {
    await User.destroy({ where: { id } });
  }
}

export default UserService;
