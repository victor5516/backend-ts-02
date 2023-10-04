import { Schema, model } from "mongoose";
import { IUser } from "../models/user.interface";

const userSchema = new Schema<IUser>({
  name: String,
  email: String,
  password: String,
});

const User = model("User", userSchema);

export default User;
