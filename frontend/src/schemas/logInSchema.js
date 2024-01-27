import * as yup from "yup";

export const logInSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup.string().required("Required"),
});
