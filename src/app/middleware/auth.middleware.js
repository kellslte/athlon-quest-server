import { UnauthenticatedError } from "../../lib/errors.js";
import JwtProvider from "../providers/jwt.provider.js";

class AuthMiddleware {
  handle(req, res, next) {
    try {
      const token = req.cookies.authentication;

      if (!token)
        throw new UnauthenticatedError(
          "Invalid or missing authentication token"
        );

      req.user = JwtProvider.validateAuthenticationToken(token);
      next();
    } catch (error) {
      throw error;
    }
  }
}

export default AuthMiddleware;