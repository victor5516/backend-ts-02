import { Document, Schema, model } from "mongoose";

export interface IUserSchema extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUserSchema>({
  name: String,
  email: String,
  password: String,
});

const User = model("User", userSchema);

export default User;
