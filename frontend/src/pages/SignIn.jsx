import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, useField } from "formik";

import { logInSchema } from "../schemas/logInSchema";

import { useLoginMutation } from "../services/authService";

import { urlSlug } from "../utils/urlSlug";

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
  const [login, { error = "" }] = useLoginMutation({
    fixedCacheKey: "auth-login",
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // handleLogin(values, resetForm);
    login(values);
    setSubmitting(false);
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={logInSchema}
        onSubmit={handleSubmit}
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
        <Link to={urlSlug.REGISTER}>
          <span className="capitalize text-teal underline">create account</span>
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
