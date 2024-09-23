// @ts-nocheck
import RoleService from "../app/services/roles.service.js";
import { NotFoundError, UnauthorizedError } from "../lib/errors.js";
import AppConfig from "../config/app.config.js";
import RedisProvider from "../app/providers/redis.provider.js";
import FileProvider from "../app/providers/file.provider.js";
import CacheService from "../config/cache.config.js";

class BaseController {
  constructor() {
    this.cache = new CacheService().getInstance();
    this.file = new FileProvider();
  }
  /**
   * Checks if the user has the required permission to access the resource.
   *
   * @param {string} role - The role of the user.
   * @param {string} resource - The resource to check access to.
   * @param {string} action - The action the user is trying to perform.
   *
   * @throws {UnauthorizedError} If the user is not authorized to perform the action.
   */
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

  /**
   * Authorizes the user to access the requested resource.
   *
   * @param {Express.Request} req - The Express request object.
   * @param {Express.NextFunction} next - The Express next function.
   *
   * @throws {NotFoundError} If the requested route does not exist on the server.
   * @throws {UnauthorizedError} If the user is not authorized to perform the action.
   */
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

  /**
   * A higher-order function to handle the authorization check and route
   * execution for each controller method.
   *
   * @param {function} fn - The route handler function to be wrapped.
   * @returns {function} A new function that wraps the original route handler
   *  with the authorization check. If the authorization fails, it will call
   *  the `next` function with an error.
   */
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

  /**
   * Sends a JSON response to the client with the given data and message.
   *
   * @param {Response} res - The response object to send the response with.
   * @param {*} data - The data to be sent in the response.
   * @param {string} message - The message to be sent in the response.
   * @param {number} [status=200] - The HTTP status code to send in the response.
   * @returns {Response} The response object that was sent.
   */
  sendResponse(res, data, message, status = 200) {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  }

  /**
   * Throws an error with the given message. This method is used to wrap
   * an error with a custom message and throw it.
   *
   * @param {Error} error - The error to be thrown.
   * @param {string} message - The message to be sent in the error.
   */
  throwError(error, message) {
    throw new error(message);
  }
}

export default BaseController;
