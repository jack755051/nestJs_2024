import { Role } from 'src/common/enums/role.enum';

export interface UserPayload {
  id: string;
  username: string;
  role: Role;
}
