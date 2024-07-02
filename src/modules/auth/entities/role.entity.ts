import { Exclude } from 'class-transformer';
import { ITraceable } from 'src/common/interfaces/traceable';
import { Permission } from './permission.entity';

export class Role implements ITraceable {
  id: string;

  name: string;

  description: string | undefined;

  permissions: Permission[];

  @Exclude()
  createdAt: Date | undefined;

  @Exclude()
  updatedAt: Date | undefined;
}
