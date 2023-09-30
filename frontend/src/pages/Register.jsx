import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

import doctorVector from "../assets/SignInPageVector.png";
import medPlusLogo from "../assets/MedPlusLogo.png";

import BASE_URL from "../config/ApiConfig";

export const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const inputModifiedClasses = `text-input w-full rounded-lg p-2 mb-3 outline-none bg-lightGrey placeholder:text-sm text-sm ${
    meta.touched && meta.error ? "border-2 border-red" : ""
  }`;

  return (
    <>
      <label
        className="mb-2 text-sm font-semibold"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input className={inputModifiedClasses} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error -mt-2 mb-1 font-bold text-red">{meta.error}</div>
      ) : null}
    </>
  );
};

const Register = () => {
  const [message, setMessage] = useState(null);

  const register = async (username, email, password) => {
    // setLoading(true);
    const config = {
      method: "post",
      url: `${BASE_URL}auth/register`,
      data: {
        userName: username,
        email: email,
        password: password,
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  return (
    <div className="bg-babyBlue flex h-screen w-screen">
      <div className="flex  w-full items-center justify-center p-3 lg:w-1/2">
        <div className="z-10 flex h-full w-full max-w-md flex-col justify-between rounded-3xl bg-white p-6">
          <div className="">
            <img src={medPlusLogo} alt="MedPlus Logo" className="h-6" />
          </div>
          <div className="w-full">
            <Formik
              initialValues={{
                email: "",
                username: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),
                username: Yup.string()
                  .max(30, "Must be 30 characters or less")
                  .required("Required"),
                password: Yup.string()
                  .required("Required")
                  .min(8, "Your password is too short.")
                  .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    "Password must contain at least one uppercase letter, one lowercase letter, one numeral, and one symbol.",
                  ),
                confirmPassword: Yup.string()
                  .required("Required")
                  .oneOf(
                    [Yup.ref("password"), null],
                    "Passwords must match",
                  ),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                register(values.username, values.email, values.password);
                setSubmitting(false);
                resetForm({});
              }}
            >
              <Form className="mt-3 flex w-full flex-col">
                <TextInput
                  label="User Name"
                  name="username"
                  type="text"
                  placeholder="John Doe"
                />

                <TextInput
                  label="Email"
                  name="email"
                  type="text"
                  placeholder="johndoe@gmail.com"
                />

                <TextInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="********"
                />

                <TextInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="********"
                />

                {message && (
                  <div className="my-3 rounded-lg border border-red p-3 text-sm">
                    <p className="text-red">{message}</p>
                  </div>
                )}

                <div className="mt-3 flex">
                  <button
                    className="w-full rounded-lg border-none bg-teal p-2 outline-none"
                    type="submit"
                  >
                    <p className="text-sm font-semibold uppercase text-white">
                      create new account
                    </p>
                  </button>
                </div>
              </Form>
            </Formik>

            <p className="mt-5 text-sm font-semibold">
              Already have an account?{" "}
              <Link to="/sign-in">
                <span className="capitalize text-teal underline">sign in</span>
              </Link>
            </p>
          </div>
          <p className="text-xs capitalize">
            MedPlus&copy; - sample MERN stack project
          </p>
        </div>
      </div>
      <div className="hidden w-1/2 items-center justify-center py-3 lg:flex">
        <div className="bg-babyBlue h-full w-2/3 rounded-3xl"></div>
        <img
          src={doctorVector}
          alt="doctor vector"
          className="absolute right-0 top-1/2 h-5/6  -translate-y-1/2"
        />
      </div>
    </div>
  );
};

export default Register;
