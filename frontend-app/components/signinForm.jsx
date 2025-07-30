// src/components/SigninForm.jsx

import { Link, useNavigate } from "react-router-dom";
import { useSigninUserMutation } from "../services/authServices";
import {
  signinSchemaValidation,
  initialValues,
} from "../validations/signinValidation.form";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";

const fields = ["username", "email", "password", "masterKey"];
const placeHolders = {
  username: "User name...",
  email: "Email...",
  password: "Password...",
  masterKey: "Master key...",
};

function SigninForm() {
  const [signinUser, { isLoading, error }] = useSigninUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: signinSchemaValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        const userData = await signinUser(values).unwrap();
        dispatch(setCredentials(userData));
        resetForm();
        navigate("/dashboard");
      } catch (err) {
        if (err.status === 401) {
          alert(
            "This is a private tool. Only administrators can authorize new users with a valid master key. However, you can still explore and read the stories without creating an account."
          );
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-md w-full mx-auto flex flex-col gap-6"
    >
      {/* Título */}
      <h2 className="text-2xl font-bold text-rose-600 text-center mb-2">
        Create Account
      </h2>
      <p className="text-gray-500 text-sm text-center mb-6">
        Fill in your details to join the platform.
      </p>

      {/* Campos */}
      {fields.map((field) => (
        <div key={field} className="flex flex-col gap-2">
          <input
            name={field}
            type={
              field === "password" || field === "masterKey"
                ? "password"
                : "text"
            }
            placeholder={placeHolders[field]}
            value={formik.values[field]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-4 bg-emerald-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
          {formik.touched[field] && formik.errors[field] && (
            <p className="text-red-600 text-sm">{formik.errors[field]}</p>
          )}
        </div>
      ))}

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-400 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition duration-200"
      >
        {isLoading ? "Signing in..." : "Sign Up"}
      </button>

      {/* Mensaje de error general */}
      {error?.data?.message && (
        <p className="text-red-800 text-sm text-center">
          Something went wrong. Please try again.
        </p>
      )}

      {/* Enlace a login */}
      <div className="text-center mt-4">
        <Link
          to="/login"
          className="text-rose-500 hover:text-rose-600 text-sm transition"
        >
          Already have an account? Log in
        </Link>
      </div>
    </form>
  );
}

export default SigninForm;
