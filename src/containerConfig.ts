import * as config from 'config'
import { Container } from "inversify";
import path from 'path';
import { TYPES } from "./containerTypes";
import ArchiveService from './services/archiveService';
import UserService from './features/User/UserService';
import UserLogic from './features/User/UserLogic';
import UserData from './features/User/UserData';
import "reflect-metadata";

console.log(config.type)
export const container: Container = new Container();
container.bind<ArchiveService>(TYPES.ArchiveService).to(ArchiveService).inSingletonScope();
container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
container.bind<UserLogic>(TYPES.UserLogic).to(UserLogic).inSingletonScope();
container.bind<UserData>(TYPES.UserData).to(UserData).inSingletonScope();
// Values
config.api.middleware.router.controllers = path.join(__dirname, config.api.middleware.router.controllers) // fix controller path
container.bind<any>(TYPES.ApiConfig).toConstantValue(config.api);