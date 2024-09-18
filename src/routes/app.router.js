import Router from "../common/base.router.js";
import AppController from "../app/controllers/app.controller.js";
import AuthController from "../app/controllers/auth.controller.js";
import AuthMiddleware from "../app/middleware/auth.middleware.js";
import TrackController from "../app/controllers/track.controller.js";

const appController = new AppController();
const authController = new AuthController();
const trackController = new TrackController();
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
    method: "get",
    path: "/tracks",
    action: [
      authMiddleware.handle.bind(authMiddleware),
      trackController.getAllTracks.bind(trackController),
    ],
  },
  {
    method: "get",
    path: "/tracks/:id",
    action: [
      authMiddleware.handle.bind(authMiddleware),
      trackController.getTrackById.bind(trackController),
    ],
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
    method: "all",
    path: "*",
    action: [appController.notFoundRoute.bind(appController)],
  },
];

const router = new Router();
router.registerRoutes(routes);

export const appRouter = router.getRouter();
