import { INewUser, ISecureUser } from "../models/user.interface";
import {
  createUserStorage,
  deleteUserStorage,
  getUserByIdStorage,
  getUsersStorage,
  updateUserStorage,
} from "../storage/user.storage";

export const createUserService = async (newUser: INewUser): Promise<string> => {
  const user = await createUserStorage(newUser);
  return user._id;
};

export const getUserByIdService = async (
  id: string
): Promise<ISecureUser | null> => {
  const user = await getUserByIdStorage(id);

  if (!user) return null;

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
};

export const getUsersService = async (): Promise<ISecureUser[]> => {
  const users = await getUsersStorage();

  return users.map((user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
  }));
};

export const updateUserService = async (
  id: string,
  user: Partial<INewUser>
): Promise<ISecureUser | null> => {
  const updatedUser = await updateUserStorage(id, user);
  if (!updatedUser) return null;

  return {
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
  };
};

export const deleteUserService = async (id: string): Promise<string | null> => {
  const user = await deleteUserStorage(id);

  if (!user) return null;

  return user._id;
};
