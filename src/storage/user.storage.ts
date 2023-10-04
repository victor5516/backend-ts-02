import { INewUser, IUser } from "../models/user.interface";
import User from "../schemas/user.schema";

export const createUserStorage = async (newUser: INewUser): Promise<IUser> => {
  const user = new User(newUser);
  await user.save();

  return user;
};

export const getUserByIdStorage = async (id: string): Promise<IUser> => {
  const user = await User.findById(id);
  return user;
};

export const getUsersStorage = async (): Promise<IUser[]> => {
  const users = await User.find();
  return users;
};

export const updateUserStorage = async (
  id: string,
  user: Partial<INewUser>
): Promise<IUser> => {
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
  return updatedUser;
};

export const deleteUserStorage = async (id: string): Promise<IUser> => {
  const deletedUser = await User.findByIdAndDelete(id);

  return deletedUser;
};
