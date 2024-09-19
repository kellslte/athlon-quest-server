import Joi from "joi";
import BaseRequest from "../../common/base.request.js";

class AddCoursesToLearningPathRequest extends BaseRequest {
  constructor(req) {
    super(req);
  }

  rules() {
    return {
      courseIds: Joi.array().items(Joi.string()),
    };
  }
}

export default AddCoursesToLearningPathRequest;
