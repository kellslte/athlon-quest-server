import Router from "../common/base.router.js";
import AppController from "../app/controllers/app.controller.js";

const appController = new AppController();

const routes = [
  {
    method: "get",
    path: "/",
    action: appController.sayHello.bind(appController),
  },
  {
    method: 'get',
    path: '/health',
    action: appController.serverStatus.bind(appController),
  },
  {
    method: "all",
    path: "*",
    action: appController.notFoundRoute.bind(appController),
  }
];

const router = new Router();
router.registerRoutes(routes);

export const appRouter = router.getRouter();
