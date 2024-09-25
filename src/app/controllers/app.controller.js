import BaseController from "../../common/base.controller.js";
import { NotFoundError } from "../../lib/errors.js";

class AppController extends BaseController {
  constructor() {
    super();
  }

  sayHello = this.asyncHandler(async (req, res) => {
    return this.sendResponse(res, {}, "Hello World!");
  });

  serverStatus = this.asyncHandler(async (req, res) => {
    return this.sendResponse(res, {}, "Server is up and running!", 200);
  });
}

export default AppController;
