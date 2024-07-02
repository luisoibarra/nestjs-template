import { Exclude } from 'class-transformer';
import { ITraceable } from 'src/common/interfaces/traceable';
import { UserPermission } from './user-permission.entity';
import { Role } from './role.entity';

export class Permission implements ITraceable {
  id: string;

  name: string;

  UserPermission: UserPermission[];

  roles: Role[];

  @Exclude()
  createdAt: Date | undefined;

  @Exclude()
  updatedAt: Date | undefined;
}
