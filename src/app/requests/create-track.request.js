import Joi from "joi";
import BaseRequest from "../../common/base.request.js";

class CreateTrackRequest extends BaseRequest
{ 
    constructor(req) {
        super(req);
    }

    rules ()
    {
        return {
            title: Joi.string().required(),
            description: Joi.string().required(),
        };
    }
};

export default CreateTrackRequest;