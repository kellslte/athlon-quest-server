import BaseRequest from "../../common/base.request.js";
import Joi from "joi";

class CreateUserRequest extends BaseRequest {
  constructor(req) {
    super(req);
  }

  rules() {
    return {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role: Joi.string().valid("admin", "teacher", "student").required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      country: Joi.string().required(),
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zipCode: Joi.string().required(),
      primary: Joi.boolean().required(),
    };
  }
}

export default CreateUserRequest;