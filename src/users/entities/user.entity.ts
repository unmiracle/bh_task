import * as bcrypt from 'bcryptjs';
import { BeforeInsert, Column, Entity } from 'typeorm';

import { CoreEntity } from '../../common/abstracts/core-entity.abstract';

@Entity('users')
export class User extends CoreEntity {
  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column()
  email: string;

  @Column({ default: 1 })
  roles: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  hasRole(role: number) {
    return (this.roles & role) === role;
  }

  addRole(role: number) {
    this.roles |= role;
  }

  removeRole(role: number) {
    this.roles &= ~role;
  }

  setRoles(roles: number) {
    this.roles = roles;
  }
}
