import { UserType } from "./user-type.model";


export interface User {
  userId: number;
  identityNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: Date;
  address: string;
  city: string;
  country: string;
  registrationDate: Date;
  userType: UserType;
  userTypeId: number;
  driverLicenseNumber?: string;
}