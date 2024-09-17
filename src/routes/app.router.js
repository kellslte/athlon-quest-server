import Router from "../common/base.router.js";
import AppController from "../app/controllers/app.controller.js";
import AuthController from "../app/controllers/auth.controller.js";

const appController = new AppController();
const authController = new AuthController();

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
    method: "all",
    path: "*",
    action: [appController.notFoundRoute.bind(appController)],
  },
];

const router = new Router();
router.registerRoutes(routes);

export const appRouter = router.getRouter();
