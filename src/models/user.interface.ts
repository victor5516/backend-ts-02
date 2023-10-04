export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export type INewUser = Omit<IUser, "_id">;
export type ISecureUser = Omit<IUser, "password">;
