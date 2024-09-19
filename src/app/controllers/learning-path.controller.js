import BaseController from "../../common/base.controller.js";
import CreateLearningPathRequest from "../requests/create-learning-path.request.js";
import LearningPathService from "../services/learning-path.service.js";
import AddCoursesToLearningPathRequest from "../requests/add-courses-to-learning-path.request.js";

class LearningPathController extends BaseController {
  constructor() {
    super();
  }

  getTrackLearningPaths = this.asyncHandler(async (req, res) => {
    const learningPaths = await LearningPathService.getTrackLearningPaths(
      req.params.trackId
    );

    this.sendResponse(
      res,
      learningPaths,
      "Learning Paths retrieved successfully"
    );
  });

  getLearningPath = this.asyncHandler(async (req, res) => {
    const learningPath = await LearningPathService.getLearningPath(
      req.params.id
    );
    this.sendResponse(
      res,
      learningPath,
      "Learning Path retrieved successfully"
    );
  });

  createLearningPath = this.asyncHandler(async (req, res) => {
    const requestValidator = new CreateLearningPathRequest(req);
    const payload = await requestValidator.validate();
    const learningPath = await LearningPathService.createLearningPath({
      ...payload,
      trackId: req.params.trackId,
    });
    this.sendResponse(
      res,
      learningPath,
      "Learning Path created successfully",
      201
    );
  });

  updateLearningPath = this.asyncHandler(async (req, res) => {
    const requestValidator = new CreateLearningPathRequest(req);
    const payload = await requestValidator.validate();
    const learningPath = await LearningPathService.updateLearningPath(
      req.params.id,
      payload
    );
    this.sendResponse(res, learningPath, "Learning Path updated successfully");
  });

  addCoursesToLearningPath = this.asyncHandler(async (req, res) => {
    const requestValidator = new AddCoursesToLearningPathRequest(req);
    const payload = await requestValidator.validate();
    const learningPath = await LearningPathService.addCoursesToLearningPath(
      req.params.id,
      payload.courseIds
    );
    this.sendResponse(
      res,
      learningPath,
      "Courses added to Learning Path successfully"
    );
  });

  removeCourseFromLearningPath = this.asyncHandler(async (req, res) => {
    const learningPath = await LearningPathService.removeCourseFromLearningPath(
      req.params.id,
      req.params.courseId
    );
    this.sendResponse(
      res,
      learningPath,
      "Course removed from Learning Path successfully"
    );
  });

  deleteLearningPath = this.asyncHandler(async (req, res) => {
    await LearningPathService.deleteLearningPath(req.params.id);
    this.sendResponse(res, null, "Learning Path deleted successfully");
  });
}

export default LearningPathController;
