import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDto as UserRegisterDto } from '../dto/user-register.dto';
import { UserService } from '../services/user.service';
import { AllowAnonymous } from 'src/modules/auth/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @AllowAnonymous()
  async registerUser(@Body() body: UserRegisterDto): Promise<any> {
    await this.userService.registerUser(body);
  }
}
