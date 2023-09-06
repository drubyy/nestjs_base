import { Exclude } from 'class-transformer';

export class UserEntity {
  id: number;
  firstName: string;
  lastName: string;

  @Exclude()
  hash: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}