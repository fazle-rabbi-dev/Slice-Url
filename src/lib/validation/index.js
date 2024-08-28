import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

export const signUpSchema = yup.object().shape({
  name: yup.string().min(3),
  username: yup.string().min(4),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

