import { SetMetadata } from '@nestjs/common';
import { AuthRoles } from '../enums/roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: AuthRoles[]) => SetMetadata(ROLES_KEY, roles);
