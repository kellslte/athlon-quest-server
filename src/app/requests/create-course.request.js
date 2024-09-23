import Joi from "joi";
import BaseRequest from "../../common/base.request.js";

class CreateCourseRequest extends BaseRequest {
  constructor(req) {
    super(req);
  }

  // @ts-ignore
  rules() {
    return {
      title: Joi.string().required(),
      description: Joi.string().required(),
      duration: Joi.number().integer().positive().required(),
    };
  }
}

export default CreateCourseRequest;
