import { NotFoundError, UnauthorizedError } from "../../lib/errors.js";
import JwtProvider from "../providers/jwt.provider.js";
import UserService from "./user.service.js";
import argon from "argon2";

class AuthService {
  static async authenticate(payload) {
    const user = await UserService.getUserByEmail(payload.email);

    if (!user)
      throw new NotFoundError(
        "Invalid credentials, please check your input and try again"
      );

    if (
      !(await argon.verify(user.get("password").toString(), payload.password))
    )
      throw new UnauthorizedError(
        "Invalid credentials, please check your input and try again"
      );

    return JwtProvider.generateAuthenticationToken({
      id: user.get("id").toString(),
      role: user.get("role").toString(),
      email: user.get("email").toString(),
    });
  }

  static async createUserAccount(payload) {
    return await UserService.createUser(payload);
  }
}

export default AuthService;
