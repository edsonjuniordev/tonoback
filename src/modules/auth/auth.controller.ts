import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { IsPublic } from '../../shared/decorators/is.public';
import { IsActiveUserId } from '../../shared/decorators/is.active.user.id';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto)  
  }

  @IsPublic()
  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('account-verification')
  @HttpCode(HttpStatus.NO_CONTENT)
  accountVerification(@IsActiveUserId() userId: string) {
    return this.authService.accountVerification(userId)
  }
}
