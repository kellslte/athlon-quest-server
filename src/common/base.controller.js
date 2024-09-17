class BaseController {
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
