import { INewUser } from "../models/user.interface";
import User, { IUserSchema } from "../schemas/user.schema";

export const createUserStorage = async (
  newUser: INewUser
): Promise<IUserSchema> => {
  const user = new User(newUser);
  await user.save();

  return user;
};

export const getUserByIdStorage = async (id: string): Promise<IUserSchema> => {
  const user = await User.findById(id);
  return user;
};

export const getUserByEmailStorage = async (email: string): Promise<IUserSchema> => {
  const user = await User.findOne({email});
  return user;
}

export const getUsersStorage = async (): Promise<IUserSchema[]> => {
  const users = await User.find();
  return users;
};

export const updateUserStorage = async (
  id: string,
  user: Partial<INewUser>
): Promise<IUserSchema> => {
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
  return updatedUser;
};

export const deleteUserStorage = async (id: string): Promise<IUserSchema> => {
  const deletedUser = await User.findByIdAndDelete(id);

  return deletedUser;
};
