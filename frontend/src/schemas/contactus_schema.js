import * as yup from "yup" ;

export const contactusSchema = yup.object().shape({
    name:yup.string().min(3).required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
    message:yup.string().min(5).required("Required")
});