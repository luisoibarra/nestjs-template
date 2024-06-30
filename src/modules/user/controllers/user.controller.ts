import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserRegisterDto as UserRegisterDto } from '../dto/user-register.dto';
import { UserService } from '../services/user.service';
import { AllowAnonymous } from 'src/modules/auth/decorators/public.decorator';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { PasswordRecoveryDto } from '../dto/password-recovery.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @AllowAnonymous()
  async registerUser(@Body() body: UserRegisterDto): Promise<any> {
    await this.userService.registerUser(body);
  }

  @Get('verify-email')
  @AllowAnonymous()
  async verifyEmail(@Query('token') token: string): Promise<any> {
    await this.userService.verifyEmail(token);
  }

  @Post('password-recovery')
  @AllowAnonymous()
  async sendPasswordRecovery(@Body() data: PasswordRecoveryDto): Promise<any> {
    await this.userService.sendResetPasswordEmail(data.email);
  }

  @Put('password-recovery')
  @AllowAnonymous()
  async checkPasswordRecovery(@Body() data: ResetPasswordDto): Promise<any> {
    await this.userService.resetPassword(data.password, data.token);
  }
}
