import { TokenData } from '@modules/auth';
import { NextFunction, Request, Response } from 'express';
import RegisterDto from './dtos/register.dto';
import UserService from './users.service';

export default class UsersController {
  private userService = new UserService();

  public register = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const model: RegisterDto = req.body;
      const TokenData: TokenData = await this.userService.createUser(model);
      res.status(201).json(TokenData);
    } catch (error) {
      next(error);
    }
  };
  public update = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const model: RegisterDto = req.body;
      const userId = req.params.id;
      const user = await this.userService.updateUser(userId,model);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
  public getCurrentLoginUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const user = await this.userService.getCurrentLoginUser(req.params.id);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };
}
