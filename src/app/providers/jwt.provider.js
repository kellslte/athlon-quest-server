import jwt from "jsonwebtoken";
import AppConfig from "../../config/app.config.js";

class JwtProvider {
  static generateAuthenticationToken(payload) {
    return jwt.sign(payload, AppConfig.getOrThrow("jwt_secret"), {
      expiresIn: AppConfig.getOrThrow("jwt_expires_in"),
    });
  }

  static validateAuthenticationToken(token) {
    return jwt.verify(token, AppConfig.getOrThrow("jwt_secret"));
  }
}

export default JwtProvider;
