import { Exclude } from 'class-transformer';
import { ITraceable } from 'src/common/interfaces/traceable';
import { Permission } from './permission.entity';

export class UserPermission implements ITraceable {
  id: string;

  userId: string;

  permissionId: string;

  permission: Permission;

  @Exclude()
  createdAt: Date | undefined;

  @Exclude()
  updatedAt: Date | undefined;
}
