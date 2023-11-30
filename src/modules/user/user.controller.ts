import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { IsActiveUserId } from '../../shared/decorators/is.active.user.id';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('me')
  me(@IsActiveUserId() userId: string) {
    return this.userService.getUserById(userId)
  }
}
