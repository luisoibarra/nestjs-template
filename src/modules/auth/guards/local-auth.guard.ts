import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthConstants } from '../auth-constants';

@Injectable()
export class LocalAuthGuard extends AuthGuard(AuthConstants.LOCAL_STRATEGY) {}
