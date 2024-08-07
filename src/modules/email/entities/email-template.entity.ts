import { Exclude } from 'class-transformer';
import { ITraceable } from 'src/common/interfaces/traceable';

export class EmailTemplate implements ITraceable {
  id: string;
  templateName: string;
  subject: string;
  template: string;
  @Exclude()
  createdAt: Date | undefined;
  @Exclude()
  updatedAt: Date | undefined;
}
