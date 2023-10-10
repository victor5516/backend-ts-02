import { ValidationError } from "express-validator";
import bcrypt from "bcrypt";

export const formatRequestError = (errors: ValidationError[]) => {
  return errors.map((error) => ({
    error: error.msg,
    type: error.type,
  }));
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export const comparePassword = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
}
