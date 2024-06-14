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
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AllowAnonymous } from '../decorators/public.decorator';
import { AppJwtService } from '../services/app-jwt.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: AppJwtService,
  ) {}

  @AllowAnonymous()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  @Post('refresh-session')
  async refreshSesisonToken(@Request() req: any): Promise<LoginResponseDto> {
    return this.authService.refreshToken(req.claims, true, false);
  }

  @Post('refresh-session')
  async refreshRefreshToken(@Request() req: any): Promise<LoginResponseDto> {
    return this.authService.refreshToken(req.claims, false, true);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
