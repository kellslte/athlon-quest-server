import BaseRequest from "../../common/base.request.js";
import Joi from "joi";

class LoginUserRequest extends BaseRequest {
  constructor(req) {
    super(req);
  }

  rules() {
    return {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    };
  }
}

export default LoginUserRequest;
