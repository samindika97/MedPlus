import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import {
  loginUser,
  clearError,
  userSelector,
} from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

import doctorVector from "../assets/SignInPageVector.png";
import medPlusLogo from "../assets/MedPlusLogo.png";

export const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const inputModifiedClasses = `text-input w-full rounded-lg p-2 mb-3 outline-none bg-lightGrey placeholder:text-sm ${
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

const SignIn = () => {
  const { error } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const signIn = (values) => {
    console.log(values);
    dispatch(loginUser(values));
  };

  return (
    <div className="flex h-screen w-screen bg-babyBlue">
      <div className="flex w-full items-center justify-center p-3 lg:w-1/2">
        <div className="z-10 flex h-full w-full max-w-md flex-col justify-between rounded-3xl bg-white p-6">
          <div className="">
            <img src={medPlusLogo} alt="MedPlus Logo" className="h-6" />
          </div>
          <div className="w-full">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),
                password: Yup.string().required("Required"),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                signIn(values);
                setSubmitting(false);
                resetForm({});
              }}
            >
              <Form className="mt-3 flex w-full flex-col">
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

                {error && (
                  <div className="my-3 rounded-lg border border-red p-3 text-sm">
                    <p className="text-red">{error}</p>
                  </div>
                )}

                <div className="mt-3 flex">
                  <button
                    className="w-full rounded-lg border-none bg-teal p-2 outline-none"
                    type="submit"
                  >
                    <p className="text-sm font-semibold uppercase text-white">
                      sign in
                    </p>
                  </button>
                </div>
              </Form>
            </Formik>

            <p className="mt-5 text-sm font-semibold">
              New to MedPlus?{" "}
              <Link to="/register">
                <span className="capitalize text-teal underline">
                  create account
                </span>
              </Link>
            </p>
          </div>
          <p className="text-xs capitalize">
            MedPlus&copy; - sample MERN stack project
          </p>
        </div>
      </div>
      <div className="hidden w-1/2 items-center justify-center py-3 lg:flex">
        <div className="h-full w-2/3 rounded-3xl bg-babyBlue"></div>
        <img
          src={doctorVector}
          alt="doctor vector"
          className="absolute right-0 top-1/2 h-5/6 -translate-y-1/2"
        />
      </div>
    </div>
  );
};

export default SignIn;
