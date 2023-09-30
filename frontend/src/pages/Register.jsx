import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

import doctorVector from "../assets/SignInPageVector.png";
import medPlusLogo from "../assets/MedPlusLogo.png";

export const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const inputModifiedClasses = `text-input w-full rounded-lg p-2 mb-3 outline-none bg-lightGrey placeholder:text-blue placeholder:text-sm text-sm ${
    meta.touched && meta.error ? "border-2 border-red" : ""
  }`;

  return (
    <>
      <label className="mb-2 font-semibold text-sm" htmlFor={props.id || props.name}>
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

  return (
    <div className="flex h-screen w-screen">
      <div className="flex w-1/2 flex-col justify-between p-5">
        <div className="">
          <img src={medPlusLogo} alt="MedPlus Logo" className="h-6" />
        </div>
        <div className="max-w-md">
          <h3 className="mb-5 text-center text-2xl font-bold uppercase text-blue">
            create an account
          </h3>
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
                .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              //   addDisease(values.name, values.content, values.symptoms);
              setSubmitting(false);
              resetForm({});
            }}
          >
            <Form className="mt-3 flex w-full flex-col">
              <TextInput
                label="User Name"
                name="text"
                type="username"
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
                  className="w-full rounded-xl border-none bg-teal p-3 outline-none"
                  type="submit"
                >
                  <p className="font-semibold uppercase text-white text-sm">register</p>
                </button>
              </div>
            </Form>
          </Formik>

          <p className="mt-5 text-sm font-semibold">
            Already have an account?{" "}
            <Link to="/register">
              <span className="capitalize text-teal underline">sign in</span>
            </Link>
          </p>
        </div>
        <p className="text-xs capitalize">
          MedPlus&copy; - sample MERN stack project
        </p>
      </div>
      <div className="flex w-1/2 items-center justify-center py-3">
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
