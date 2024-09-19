import RoleService from "../app/services/roles.service.js";
import { NotFoundError, UnauthorizedError } from "../lib/errors.js";
import AppConfig from "../config/app.config.js";
import RedisProvider from "../app/providers/redis.provider.js";
import FileProvider from "../app/providers/file.provider.js";

class BaseController {
  constructor() {
    this.cache = new RedisProvider();
    this.file = new FileProvider();
  }
  async permitAccess(role, resource, action) {
    // fetch the data from the database and cache it
    let permissions;
    const cachedPermissions = JSON.parse(await this.cache.get(role));
    if (cachedPermissions) {
      permissions = cachedPermissions;
    } else {
      permissions = await RoleService.getRoleByName(role);
      await this.cache.set(role, JSON.stringify(permissions), 18600);
    }
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

  async authorize(req, next) {
    if (AppConfig.excludedRoutes().includes(req.path)) return;

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

    const routes = JSON.parse(await this.cache.get("routes"));

    if (!req.user && !routes.includes(req.path))
      next(
        new NotFoundError(
          `The requested route ${req.originalUrl} does not exist on the server`
        )
      );

    await this.permitAccess(
      req.user.role,
      String(req.path.split("/")[1]),
      action
    );
  }

  asyncHandler(fn) {
    return async (req, res, next) => {
      try {
        await this.authorize(req, next);
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
