import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  TooManyRequestsError,
  UnauthenticatedError,
  UnauthorizedError,
  ValidationError,
} from "../../lib/errors.js";

class GlobalErrorHandler {
  handle(err, req, res, next) {
    if (
      err instanceof NotFoundError ||
      err instanceof UnauthenticatedError ||
      err instanceof ConflictError ||
      err instanceof BadRequestError ||
      err instanceof UnauthorizedError ||
      err instanceof TooManyRequestsError
    ) {
      return res.status(err.statuscode).json({
        success: false,
        message: err.message,
      });
    }

    if (err instanceof ValidationError) {
      return res.status(err.statuscode).json({
        success: false,
        message: err.message,
        errors: err.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: err.message,
      error: process.env.NODE_ENV === "development" ? err.stack : {},
    });
  }
}

const errorHandler = new GlobalErrorHandler();

export default errorHandler;
