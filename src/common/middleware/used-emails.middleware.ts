import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UsedEmailsMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: any, res: any, next: () => void) {
    if (req.body.email) {
      const emailUsed = await this.userService.findByEmail(req.body.email);
      if (emailUsed) {
        return res.status(400).json({
          message: 'Email already in use',
        });
      }
    }
    next();
  }
}
