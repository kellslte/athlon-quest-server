import AuthService from "../../app/services/auth.service.js";
import BaseController from "../../common/base.controller.js";
import { asyncHandler } from "../../lib/utils";
import CreateUserRequest from "../requests/create-user.request.js";
import LoginUserRequest from "../requests/login-user.request.js";

class AuthController extends BaseController {
  constructor() {
    super();
  }

  register = asyncHandler(async (req, res) => {
    const requestValidator = new CreateUserRequest(req);

    const payload = requestValidator.validate();
    const user = await AuthService.createUserAccount(payload);
    return this.sendResponse(res, user, "User created successfully", 201);
  });

  login = asyncHandler(async (req, res) => {
    const requestValidator = new LoginUserRequest(req);

    const payload = requestValidator.validate();
    const token = await AuthService.authenticate(payload);
    return this.sendResponse(
      res,
      { token },
      "User authenticated successfully",
      200
    );
  });
}

export default AuthController;