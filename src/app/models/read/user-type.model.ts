import { User } from './user.model';

export interface UserType {
  userTypeId: number;
  userTypeName: string;
  users: User[];
}