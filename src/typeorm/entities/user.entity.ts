import { Role } from 'src/common/enums/role.enum';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  uuid: string;

  @Column()
  role: Role;

  @Column({ unique: true })
  name: string;

  @Column()
  passwordSalt: string;

  @Column()
  passwordHash: string;

  @Column()
  email: string;

  @Column()
  createAt: Date;
}
