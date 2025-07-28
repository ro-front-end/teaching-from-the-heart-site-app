import * as yup from "yup";

export const initialValues = {
  username: "",
  email: "",
  password: "",
  masterKey: "",
};

export const signinSchemaValidation = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  masterKey: yup.string().required(),
});
