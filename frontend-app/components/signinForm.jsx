import { Link, useNavigate } from "react-router-dom";
import { useSigninUserMutation } from "../services/authServices";
import {
  initialValues,
  signinSchemaValidation,
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
    initialValues: initialValues,
    validationSchema: signinSchemaValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        const userData = await signinUser(values).unwrap();
        resetForm();
        dispatch(setCredentials(userData));
        navigate("/dashboard");
      } catch (error) {
        if (error.status === 401) {
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
      className="flex justify-center flex-col p-8 gap-8 bg-white w-[30%] mx-auto mt-12 rounded-lg"
      onSubmit={formik.handleSubmit}
    >
      <h2>Signin</h2>

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
        {isLoading ? "Signinng in..." : "Signin"}
      </button>
      {error?.data.message && (
        <p className="text-red-800">Something went wrong. Please try again.</p>
      )}
      <Link className="text-end text-rose-400 hover:text-rose-500" to="/login">
        Already have an account?
      </Link>
    </form>
  );
}

export default SigninForm;
