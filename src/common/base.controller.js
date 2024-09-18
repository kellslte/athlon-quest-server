import RoleService from "../app/services/roles.service.js";
import { UnauthorizedError } from "../lib/errors.js";

class BaseController {
  async permitAccess(role, resource, action) {
    // fetch the data from the database and cache it
    const permissions = await RoleService.getRoleByName(role);

    // check if the user has the required permission to access the resource
    const permitted = permissions.permissions.some(
      (permission) =>
        permission.resource === resource && permission.actions.includes(action)
    );

    if (!permitted)
      throw new UnauthorizedError(
        "You are not authorized to perform this action"
      );
  }

  async authorize(req) {
    const publicPaths = [
      "/auth/login",
      "/auth/register",
      "/api/v1/health",
      "/",
    ];

    if (publicPaths.includes(req.path)) return;

    let action;

    switch (req.method) {
      case "GET":
        action = "read";
        break;
      case "POST":
        action = "create";
        break;
      case "PUT":
        action = "update";
        break;
      case "DELETE":
        action = "delete";
        break;
      default:
        throw new Error("Unsupported HTTP method");
    }

    await this.permitAccess(
      req.user.role,
      String(req.path.split("/")[1]),
      action
    );
  }

  asyncHandler(fn) {
    return async (req, res, next) => {
      try {
        await this.authorize(req);
        return Promise.resolve(fn(req, res, next));
      } catch (error) {
        next(error);
      }
    };
  }

  sendResponse(res, data, message, status = 200) {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  }

  throwError(error, message) {
    throw new error(message);
  }
}

export default BaseController;
