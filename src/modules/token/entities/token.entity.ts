import { Exclude } from 'class-transformer';
import { ITraceable } from 'src/common/interfaces/traceable';

export class Token implements ITraceable {
  @Exclude()
  id: string;
  token: string;
  @Exclude()
  userId: string;
  @Exclude()
  payload: string;
  @Exclude()
  active: boolean;
  expires: Date;
  @Exclude()
  createdAt: Date | undefined;
  @Exclude()
  updatedAt: Date | undefined;
}
