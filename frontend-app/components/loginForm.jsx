import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../services/authServices";
import {
  initialValues,
  loginSchemaValidation,
} from "../validations/loginValidations.form";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";

const fields = ["identifier", "password"];

const placeHolders = {
  identifier: "User name or email...",
  password: "Password...",
};

function LoginForm() {
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchemaValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        const userData = await loginUser(values).unwrap();
        console.log(userData);
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
      className="flex justify-center flex-col p-8 gap-8 bg-white w-[80%] sm:w-[50%] md:w-[30%] mx-auto mt-12 rounded-lg"
      onSubmit={formik.handleSubmit}
    >
      <h2>Login</h2>

      {fields.map((field) => (
        <div key={field} className="flex flex-col gap-2">
          <input
            type={field === "password" ? "password" : "text"}
            name={field}
            value={formik.values[field]}
            onChange={formik.handleChange}
            placeholder={placeHolders[field]}
            className="bg-emerald-100 p-4 rounded-xl focus:rounded-full outline-emerald-300"
          />
          {formik.errors[field] && formik.touched[field] && (
            <p className="text-red-600">{formik.errors[field]}</p>
          )}
        </div>
      ))}

      <button
        disabled={isLoading}
        type="submit"
        className="bg-rose-500 p-4 px-6 rounded-xl w-full mx-auto text-rose-50 font-semibold hover:bg-rose-600 transition duration-300 ease-in-out cursor-pointer"
      >
        {isLoading ? "Logging in..." : "login"}
      </button>
      {error?.data.message && (
        <p className="text-red-800">Something went wrong. Please try again.</p>
      )}
      <Link className="text-end text-rose-400 hover:text-rose-500" to="/signin">
        Don&apos;t have an account?
      </Link>
    </form>
  );
}

export default LoginForm;
