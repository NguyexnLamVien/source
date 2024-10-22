import UsersController from './users.controller';
import { Route } from '@core/interfaces';
import authMiddleware from '@core/middleware/auth.middleware';
import { Router } from 'express';

export default class UsersRoute implements Route {
  public path = '/api/users';
  public router = Router();

  public UsersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.UsersController.register);
    this.router.get(this.path + '/:id', this.UsersController.getCurrentLoginUser);
    this.router.put(this.path + '/:id', this.UsersController.update);

  }
}
