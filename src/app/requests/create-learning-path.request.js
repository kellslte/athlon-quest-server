import Joi from "joi";
import BaseRequest from "../../common/base.request.js";

class CreateLearningPathRequest extends BaseRequest {
  constructor(req) {
    super(req);
  }

  rules() {
    return {
      title: Joi.string().required(),
      description: Joi.string().required(),
      courseIds: Joi.array().items(Joi.string()),
    };
  }
}

export default CreateLearningPathRequest;
