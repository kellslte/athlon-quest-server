import AuthService from "../../app/services/auth.service.js";
import BaseController from "../../common/base.controller.js";
import AppConfig from "../../config/app.config.js";
import { ms } from "../../lib/utils.js";
import CreateUserRequest from "../requests/create-user.request.js";
import LoginUserRequest from "../requests/login-user.request.js";

class AuthController extends BaseController {
  constructor() {
    super();
  }

  register = this.asyncHandler(async (req, res) => {
    const requestValidator = new CreateUserRequest(req);

    const payload = await requestValidator.validate();
    await AuthService.createUserAccount(payload);
    return this.sendResponse(res, null, "User created successfully", 201);
  });

  login = this.asyncHandler(async (req, res) => {
    const requestValidator = new LoginUserRequest(req);

    const payload = await requestValidator.validate();
    const token = await AuthService.authenticate(payload);

    res.cookie("authentication", token, {
      expiresAt: new Date(
        Date.now() + ms(AppConfig.getOrThrow("jwt_expires_in"))
      ),
      httpOnly: true,
      secure: AppConfig.getOrThrow("node_env") === "production",
      sameSite: "strict",
    });

    return this.sendResponse(res, null, "User authenticated successfully", 200);
  });
}

export default AuthController;
