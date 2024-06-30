import {
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { LoginRequest as LoginRequestDto } from '../dtos/login-request.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AllowAnonymous } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @AllowAnonymous()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  @Post('refresh')
  async refreshTokenInfo(@Request() req: any): Promise<LoginResponseDto> {
    return this.authService.refreshToken(req.claims);
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
