import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { IsActiveUserId } from 'src/shared/decorators/is.active.user.id';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('me')
  me(@IsActiveUserId() userId: string) {
    return this.usersService.getUserById(userId)
  }
}
