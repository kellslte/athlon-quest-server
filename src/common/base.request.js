import Joi from "joi";
import { ValidationError } from "../lib/errors.js";

class BaseRequest {
  constructor(req) {
    this.req = req;
  }

  rules() {
    return {};
  }

  authorize() {}

  validate() {
    // call the internal authorize method
    this.authorize();

    const schema = Joi.object(this.rules());

    const { error, value } = schema.validate(this.req.body, {
      abortEarly: false,
    });
    if (error) {
      return this.formatValidationErrors(error.details);
    }

    return value;
  }

  formatValidationErrors(errors) {
    const formattedErrors = errors.map((error) => ({
      field: error.path[0],
      message: String(error.message).replace(/"/g, ""),
    }));

    throw new ValidationError(
      "The request failed with the following errors",
      formattedErrors
    );
  }
}

export default BaseRequest;
