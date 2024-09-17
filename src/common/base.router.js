import express from "express";

class Router {
  constructor() {
    this.router = express.Router();
  }

  registerRoutes(routes) {
    routes.forEach((route) => {
      this.router[route.method](route.path, ...route.action);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default Router;
