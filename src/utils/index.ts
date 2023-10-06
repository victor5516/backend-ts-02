import { ValidationError } from "express-validator";

export const formatRequestError = (errors: ValidationError[]) => {
  return errors.map((error) => ({
    error: error.msg,
    type: error.type,
  }));
};
