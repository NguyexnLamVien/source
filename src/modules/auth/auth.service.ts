import { DataStoredInToken } from './../auth/auth.interface';
import { HttpException } from '@core/exceptions';
import { TokenData } from '@modules/auth';
import bcryptjs from 'bcryptjs';
import { isEmptyObject, Logger } from '@core/utils';
import jwt from 'jsonwebtoken';
import LoginDto from './auth.dto';
import { IUser, UserSchema } from '@modules/users';

class AuthService {
  public userSchema = UserSchema;

  public async login(model: LoginDto): Promise<TokenData> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, 'Model is empty');
    }

    const user = await this.userSchema.findOne({ email: model.email });
    if (!user) {
      throw new HttpException(409, `Your email ${model.email} already exist.`);
    }

    const isMatchPassword = await bcryptjs.compare(model.password, user.password);
    if (!isMatchPassword) {
      throw new HttpException(409, 'Wrong password');
    }
    return this.createToken(user);
  }

  public async getUserById(userId: string): Promise<IUser> {
    const user = await this.userSchema.findById(userId).exec();
    if (!user) {
      throw new HttpException(404, `User is not exists`);
    }
    return user;
  }


  private createToken(user: IUser): TokenData {
    const dataInToken: DataStoredInToken = { id: user._id };
    const secret: string = process.env.JWT_TOKEN_SECRET!;
    const expiresIn: number = 60;
    return {
      token: jwt.sign(dataInToken, secret, { expiresIn: expiresIn }),
    }
  }
}
export default AuthService;