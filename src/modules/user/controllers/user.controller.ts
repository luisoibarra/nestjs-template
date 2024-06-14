import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDto as UserRegisterDto } from '../dto/user-register.dto';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async registerUser(@Body() body: UserRegisterDto): Promise<any> {
    await this.userService.registerUser(body);
  }
}
