// import multer from "multer";
import Router from "../common/base.router.js";
import AppController from "../app/controllers/app.controller.js";
import AuthController from "../app/controllers/auth.controller.js";
import AuthMiddleware from "../app/middleware/auth.middleware.js";
import TrackController from "../app/controllers/track.controller.js";
import LearningPathController from "../app/controllers/learning-path.controller.js";
import CourseController from "../app/controllers/course.controller.js";
// Controllers
const appController = new AppController();
const authController = new AuthController();
const trackController = new TrackController();
const learningPathController = new LearningPathController();
const courseController = new CourseController();
// Middleware
const authMiddleware = new AuthMiddleware();
// File Upload Middleware
// const upload = multer();
// Application Routes
const routes = [
  {
    method: "get",
    path: "/",
    action: [appController.sayHello.bind(appController)],
  },
  {
    method: "get",
    path: "/health",
    action: [appController.serverStatus.bind(appController)],
  },
  {
    method: "post",
    path: "/auth/register",
    action: [authController.register.bind(authController)],
  },
  {
    method: "post",
    path: "/auth/login",
    action: [authController.login.bind(authController)],
  },
  {
    method: "post",
    path: "/auth/logout",
    action: [authController.logout.bind(authController)],
  },
  {
    method: "get",
    path: "/tracks",
    action: [trackController.getAllTracks.bind(trackController)],
  },
  {
    method: "get",
    path: "/tracks/:id",
    action: [trackController.getTrackById.bind(trackController)],
  },
  {
    method: "post",
    path: "/tracks",
    action: [
      authMiddleware.handle.bind(authMiddleware),
      trackController.createTrack.bind(trackController),
    ],
  },
  {
    method: "put",
    path: "/tracks/:id",
    action: [
      authMiddleware.handle.bind(authMiddleware),
      trackController.updateTrack.bind(trackController),
    ],
  },
  {
    method: "delete",
    path: "/tracks/:id",
    action: [
      authMiddleware.handle.bind(authMiddleware),
      trackController.deleteTrack.bind(trackController),
    ],
  },
  {
    method: "get",
    path: "/tracks/:trackId/learning-path",
    action: [
      learningPathController.getTrackLearningPaths.bind(learningPathController),
    ],
  },
  {
    method: "get",
    path: "/tracks/learning-path/:id",
    action: [
      learningPathController.getLearningPath.bind(learningPathController),
    ],
  },
  {
    method: "post",
    path: "/tracks/:trackId/learning-path",
    action: [
      authMiddleware.handle.bind(authMiddleware),
      learningPathController.createLearningPath.bind(learningPathController),
    ],
  },
  {
    method: "put",
    path: "/tracks/:trackId/learning-path/:id",
    action: [
      authMiddleware.handle.bind(authMiddleware),
      learningPathController.updateLearningPath.bind(learningPathController),
    ],
  },
  {
    method: "put",
    path: "/tracks/:trackId/learning-path/:id/courses",
    action: [
      authMiddleware.handle.bind(authMiddleware),
      learningPathController.addCoursesToLearningPath.bind(
        learningPathController
      ),
    ],
  },
  {
    method: "delete",
    path: "/tracks/:trackId/learning-path/:id/courses/:courseId/remove",
    action: [
      authMiddleware.handle.bind(authMiddleware),
      learningPathController.removeCourseFromLearningPath.bind(
        learningPathController
      ),
    ],
  },
  {
    method: "delete",
    path: "/tracks/:trackId/learning-path/:id",
    action: [
      authMiddleware.handle.bind(authMiddleware),
      learningPathController.deleteLearningPath.bind(learningPathController),
    ],
  },
  {
    method: "get",
    path: "/tracks/:trackId/learning-path/:id/courses",
    action: [
      courseController.getAllCoursesByLearningPath.bind(courseController),
    ],
  },
  {
    method: "get",
    path: "/courses",
    action: [courseController.getAllCourses.bind(courseController)],
  },
  {
    method: "post",
    path: "/tracks/:trackId/learning-path/:id/courses",
    action: [
      authMiddleware.handle.bind(authMiddleware),
      courseController.createCourse.bind(courseController),
    ],
  }
];

// create a new application router instance
const router = new Router();
// register the reoutes we defined in the routes array
router.registerRoutes(routes);

// return the routes with the getRouter method
export const appRouter = router.getRouter();
