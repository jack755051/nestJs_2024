import { Role } from 'src/common/enums/role.enum';

export interface UserPayload {
  uuid: string;
  username: string;
  role: Role;
}
