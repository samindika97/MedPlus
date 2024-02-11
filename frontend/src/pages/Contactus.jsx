import { Formik, Form } from "formik";
import { contactusSchema } from "../schemas/contactUsSchema";
import axios from "axios";

import Footer from "../components/Footer";
import contactUsImage from "../assets/contactUsImage.jpg";
import {
  TextInputWithLabel as TextInput,
  TextAreaWithLabel as TextArea,
} from "../components/FormikElements";

import BASE_URL from "../config/ApiConfig";

const ContactUs = () => {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    submitForm(values, resetForm);
    setSubmitting(false);
  };

  const submitForm = async (values, resetForm) => {
    const { name, email, message } = values;

    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}message`,
      data: {
        name,
        email,
        message,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        resetForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col justify-center">
          <h2 className="m-10 text-center text-4xl font-extrabold">
            Contact Us
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={contactusSchema}
            onSubmit={handleSubmit}
          >
            <Form className="mt-3 flex w-full flex-col text-sm">
              <TextInput
                label="Name"
                name="name"
                type="text"
                placeholder="John Doe"
              />

              <TextInput
                label="Email"
                name="email"
                type="email"
                placeholder="johndoe@gmail.com"
              />

              <TextArea
                label="Message"
                name="message"
                type="text"
                rows="5"
                placeholder="Enter message here..."
              />

              <button
                className="w-max rounded-md bg-teal px-4 py-2 capitalize outline-none"
                type="submit"
              >
                <p className="text-sm font-medium text-white">send message</p>
              </button>
            </Form>
          </Formik>
        </div>
        <div className="">
          <img src={contactUsImage} alt="contact_us_image" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
