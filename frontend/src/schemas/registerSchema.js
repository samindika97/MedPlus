import * as yup from "yup";

export const registerSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Required"),
  userName: yup
    .string()
    .max(30, "Must be 30 characters or less")
    .required("Required"),
  password: yup
    .string()
    .required("Required")
    .min(8, "Your password is too short.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one numeral, and one symbol.",
    ),
  confirmPassword: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
