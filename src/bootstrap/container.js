import {
  createContainer,
  asClass,
  InjectionMode,
  asValue,
  asFunction,
} from "awilix";
import UserService from "../app/services/user.service";
import RoleService from "../app/services/roles.service";
import TrackService from "../app/services/track.service";
import AuthService from "../app/services/auth.service";
import { User } from "../app/schema/user.schema";
import { Role } from "../app/schema/access-control.schema";
import Track from "../app/models/track.model";
import LoginUserRequest from "../app/requests/login-user.request";
import CreateUserRequest from "../app/requests/create-user.request";
import JwtProvider from "../app/providers/jwt.provider";
import AppController from "../app/controllers/app.controller";
import AuthController from "../app/controllers/auth.controller";
import TrackController from "../app/controllers/track.controller";
import RedisProvider from "../app/providers/redis.provider";
import { MongooseConnection } from "../config/db.config";
import AuthMiddleware from "../app/middleware/auth.middleware";

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

function setup() {
  container.register({
    // Controllers
    AppController: asClass(AppController).singleton(),
    AuthController: asClass(AuthController).singleton(),
    TrackController: asClass(TrackController).singleton(),

    // Providers
    JwtProvider: asClass(JwtProvider).singleton(),
    RedisProvider: asClass(RedisProvider).singleton(),

    // Requests
    CreateUserRequest: asValue(CreateUserRequest),
    LoginUserRequest: asValue(LoginUserRequest),

    // Models
    UserModel: asValue(User),
    RoleModel: asValue(Role),
    TrackModel: asValue(Track),

    // Database
    MongooseConnection: asClass(MongooseConnection).singleton(),

    // Middleware
    authMiddleware: asClass(AuthMiddleware).singleton(),

    // Utils
    permitAccess: asFunction(permitAccess).singleton(),

    // Services
    UserService: asClass(UserService).singleton(),
    RoleService: asClass(RoleService).singleton(),
    TrackService: asClass(TrackService).singleton(),
    AuthService: asClass(AuthService).singleton(),
  });
}

export { container, setup };
