import Router from "../common/base.router.js";
import AppController from "../app/controllers/app.controller.js";
import AuthController from "../app/controllers/auth.controller.js";
import AuthMiddleware from "../app/middleware/auth.middleware.js";
import TrackController from "../app/controllers/track.controller.js";
import LearningPathController from "../app/controllers/learning-path.controller.js";

const appController = new AppController();
const authController = new AuthController();
const trackController = new TrackController();
const learningPathController = new LearningPathController();
const authMiddleware = new AuthMiddleware();

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
    path: "/tracks/learning-path/:id",
    action: [
      authMiddleware.handle.bind(authMiddleware),
      learningPathController.updateLearningPath.bind(learningPathController),
    ],
  },
  {
    method: "put",
    path: "/tracks/learning-path/:id/courses",
    action: [
      authMiddleware.handle.bind(authMiddleware),
      learningPathController.addCoursesToLearningPath.bind(
        learningPathController
      ),
    ],
  },
  {
    method: "delete",
    path: "/tracks/learning-path/:id/courses/:courseId",
    action: [
      authMiddleware.handle.bind(authMiddleware),
      learningPathController.removeCourseFromLearningPath.bind(
        learningPathController
      ),
    ],
  },
  {
    method: "delete",
    path: "/tracks/learning-path/:id",
    action: [
      authMiddleware.handle.bind(authMiddleware),
      learningPathController.deleteLearningPath.bind(learningPathController),
    ],
  },
  {
    method: "all",
    path: "*",
    action: [appController.notFoundRoute.bind(appController)],
  },
];

const router = new Router();
router.registerRoutes(routes);

export const appRouter = router.getRouter();
