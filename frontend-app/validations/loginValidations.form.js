import * as yup from "yup";

const isEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
const isUsername = (val) => /^[a-zA-Z0-9_]{3,}$/.test(val);

export const initialValues = {
  identifier: "",
  password: "",
};

export const loginSchemaValidation = yup.object({
  identifier: yup
    .string()
    .required()
    .test((value) => {
      return isEmail(value) || isUsername(value);
    }),
  password: yup.string().required(),
});
