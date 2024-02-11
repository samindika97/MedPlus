import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, useField } from "formik";

import { logInSchema } from "../schemas/logInSchema";

import { useLoginMutation } from "../services/authService";

import { TextInputWithLabel as TextInput } from "../components/FormikElements";
import BackendError from "../components/backendError";

import { urlSlug } from "../utils/urlSlug";

const SignIn = () => {
  const [login, { error = "" }] = useLoginMutation({
    fixedCacheKey: "auth-login",
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
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
            <BackendError
              errorMessage={
                error.status === 401
                  ? "Invalid email or password. Please try again."
                  : error.data.code
              }
            />
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
