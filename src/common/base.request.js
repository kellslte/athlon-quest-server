import Joi from "joi";
import { ValidationError } from "../lib/errors.js";

class BaseRequest {
  constructor(req) {
    this.req = req;
  }

  /**
   * Returns a Joi schema object that defines the validation rules for
   * the request body.
   *
   * @returns {Joi.ObjectSchema} The Joi schema object
   */
  rules() {
    // @ts-ignore
    return {};
  }

  /**
   * Validates the request body against the rules defined in the
   * `rules` method.
   *
   * @returns {Promise<Object>} The validated request body
   * @throws {ValidationError} If any validation errors occur
   */
  async validate() {
    const schema = Joi.object(this.rules());

    const { error, value } = schema.validate(this.req.body, {
      abortEarly: false,
    });
    if (error) {
      return this.formatValidationErrors(error.details);
    }

    return value;
  }

  /**
   * Formats a list of Joi validation errors into an object with the
   * structure required by the `ValidationError` constructor.
   *
   * @param {Joi.ValidationErrorItem[]} errors - The list of Joi validation errors
   *
   * @throws {ValidationError} The formatted errors
   */
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
