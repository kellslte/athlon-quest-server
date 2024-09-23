import BaseController from "../../common/base.controller.js";
import CreateCourseRequest from "../requests/create-course.request.js";
import CourseService from "../services/course.service.js";

class CourseController extends BaseController {
  constructor() {
    super();
  }

  getAllCoursesByLearningPath = this.asyncHandler(async (req, res) => {
    const courses = await CourseService.getCoursesByLearningPath(req.params.id);

    this.sendResponse(res, courses, "Courses retrieved successfully");
  });

  getAllCourses = this.asyncHandler(async (req, res) => {
    const courses = await CourseService.getAllCourses(
      req.query.limit,
      req.query.offset
    );

    this.sendResponse(res, courses, "Courses retrieved successfully");
  });

  getCourseById = this.asyncHandler(async (req, res) => {
    const course = await CourseService.getCourse(req.params.id);
    this.sendResponse(res, course, "Course retrieved successfully");
  });

  updateCourse = this.asyncHandler(async (req, res) => {});

  createCourse = this.asyncHandler(async (req, res) => {
    const requestValidator = new CreateCourseRequest(req);
    const payload = await requestValidator.validate();
    const course = await CourseService.createCourse(req.params.id, payload);
    this.sendResponse(res, course, "Course created successfully", 201);
  });

  deleteCourse = this.asyncHandler(async (req, res) => {
    await CourseService.deleteCourse(req.params.id);
    this.sendResponse(res, null, "Course deleted successfully");
  });
}

export default CourseController;
