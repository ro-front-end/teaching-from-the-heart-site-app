import * as yup from "yup";

export const initialValues = {
  title: "",
  contentOne: "",
  contentTwo: "",
  imageOne: null,
  imageTwo: null,
  imageThree: null,
};

export const createStorySchema = yup.object({
  title: yup.string().required(),
  contentOne: yup.string().required(),
  contentTwo: yup.string().required(),
  imageOne: yup
    .mixed()
    .required("Image one is required")
    .test(
      "fileType",
      "Only image files are allowed",
      (value) => value && value.type && value.type.startsWith("image/")
    ),
  imageTwo: yup
    .mixed()
    .required("Image two is required")
    .test(
      "fileType",
      "Only image files are allowed",
      (value) => value && value.type && value.type.startsWith("image/")
    ),
  imageThree: yup
    .mixed()
    .required("Image three is required")
    .test(
      "fileType",
      "Only image files are allowed",
      (value) => value && value.type && value.type.startsWith("image/")
    ),
});
