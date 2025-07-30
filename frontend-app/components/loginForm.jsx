// src/components/LoginForm.jsx

import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../services/authServices";
import {
  loginSchemaValidation,
  initialValues,
} from "../validations/loginValidations.form";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";

const fields = ["identifier", "password"];
const placeHolders = {
  identifier: "Username or email...",
  password: "Password...",
};

function LoginForm() {
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchemaValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        const userData = await loginUser(values).unwrap();
        dispatch(
          setCredentials({
            token: userData.token,
            user: {
              username: userData.username,
              email: userData.email,
            },
          })
        );
        resetForm();
        navigate("/dashboard");
      } catch (err) {
        console.error("Login error:", err);
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
        Log In
      </h2>
      <p className="text-gray-500 text-sm text-center mb-6">
        Welcome back! Please enter your credentials.
      </p>

      {/* Campos */}
      {fields.map((field) => (
        <div key={field} className="flex flex-col gap-2">
          <input
            name={field}
            type={field === "password" ? "password" : "text"}
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
        {isLoading ? "Logging in..." : "Log In"}
      </button>

      {/* Mensaje de error general */}
      {error?.data?.message && (
        <p className="text-red-800 text-sm text-center">
          Invalid credentials. Please try again.
        </p>
      )}

      {/* Enlace a registro */}
      <div className="text-center mt-4">
        <Link
          to="/signin"
          className="text-rose-500 hover:text-rose-600 text-sm transition"
        >
          Don&apos;t have an account? Sign up
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
