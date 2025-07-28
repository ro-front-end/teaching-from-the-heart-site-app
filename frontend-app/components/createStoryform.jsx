import { useCreateStoryMutation } from "../services/stories";
import { useFormik } from "formik";
import {
  createStorySchema,
  initialValues,
} from "../validations/createStory.form";
import { useState } from "react";
import { uploadImage } from "../utils/uploadImages";
import { useNavigate } from "react-router-dom";

function CreateStoryform({ onChangeView }) {
  const [step, setStep] = useState(1);
  const [createStory, { isLoading, error }] = useCreateStoryMutation();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: createStorySchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const imageOneUrl = await uploadImage(
          values.imageOne,
          `imageOne-${Date.now()}`
        );
        const imageTwoUrl = await uploadImage(
          values.imageTwo,
          `imageTwo-${Date.now()}`
        );
        const imageThreeUrl = await uploadImage(
          values.imageThree,
          `imageThree-${Date.now()}`
        );

        const payload = {
          title: values.title,
          contentOne: values.contentOne,
          contentTwo: values.contentTwo,
          imageOne: imageOneUrl,
          imageTwo: imageTwoUrl,
          imageThree: imageThreeUrl,
        };

        await createStory(payload).unwrap();
        resetForm();
        navigate("/dashboard");
      } catch (err) {
        console.error("Error creating story", err);

        if (err.data) {
          console.error("Backend error details:", err.data);
        } else if (err.error) {
          console.error("Backend error details:", err.error);
        }
      }
    },
  });

  async function nextStep() {
    const touchedFields = {};

    if (step === 1) {
      touchedFields.title = true;
      touchedFields.imageOne = true;
    } else if (step === 2) {
      touchedFields.contentOne = true;
      touchedFields.imageTwo = true;
    } else if (step === 3) {
      touchedFields.contentTwo = true;
      touchedFields.imageThree = true;
    }

    formik.setTouched(touchedFields, true);
    const errors = await formik.validateForm();

    // Solo avanzar si no hay errores de los campos de este paso
    const currentStepFields = Object.keys(touchedFields);
    const hasErrors = currentStepFields.some((field) => errors[field]);

    if (!hasErrors && step < 3) {
      setStep((s) => s + 1);
    }
  }

  function prevStep() {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  }

  return (
    <form
      className="bg-white rounded-xl p-12 flex flex-col items-start gap-8 text-xl"
      onSubmit={formik.handleSubmit}
    >
      <h3 className="text-rose-500 uppercase font-bold">
        Create a story step {step}
      </h3>
      <div className="flex flex-col gap-8">
        {step === 1 && (
          <>
            <div className="flex flex-col gap-2">
              <input
                className="bg-emerald-50 p-4 rounded-xl focus:rounded-full outline-emerald-200"
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                placeholder="title..."
              />
              {formik.touched.title && formik.errors.title && (
                <div className="text-red-600 ">{formik.errors.title} </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <input
                className="bg-emerald-50 p-4 rounded-xl focus:rounded-full outline-emerald-200"
                type="file"
                name="imageOne"
                accept="image/*"
                onChange={(e) =>
                  formik.setFieldValue("imageOne", e.currentTarget.files[0])
                }
                placeholder="Title image..."
              />
              {formik.touched.imageOne && formik.errors.imageOne && (
                <div className="text-red-600 ">{formik.errors.imageOne} </div>
              )}
            </div>

            <button
              onClick={nextStep}
              className="bg-rose-500 p-4 text-rose-50 rounded-xl active:bg-rose-500 hover:bg-rose-600 transition duration-300 ease-in-out cursor-pointer"
              type="button"
            >
              Next step
            </button>
            <button
              onClick={() => onChangeView(0)}
              className="bg-neutral-300 p-4 text-rose-50 rounded-xl active:bg-neutral-500 hover:bg-neutral-400 transition duration-300 ease-in-out cursor-pointer"
              type="button"
            >
              cancel
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex flex-col gap-2">
              <textarea
                className="bg-emerald-50 p-4 rounded-xl outline-emerald-200"
                type="text"
                name="contentOne"
                value={formik.values.contentOne}
                onChange={formik.handleChange}
                placeholder="Content one"
                rows="8"
                cols="38"
              />
              {formik.touched.contentOne && formik.errors.contentOne && (
                <div className="text-red-600 ">{formik.errors.contentOne} </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <input
                className="bg-emerald-50 p-4 rounded-xl focus:rounded-full outline-emerald-200"
                type="file"
                name="imageTwo"
                accept="image/*"
                onChange={(e) =>
                  formik.setFieldValue("imageTwo", e.currentTarget.files[0])
                }
                placeholder="Title image..."
              />

              {formik.touched.imageTwo && formik.errors.imageTwo && (
                <div className="text-red-600 ">{formik.errors.imageTwo} </div>
              )}
            </div>
            <button
              onClick={nextStep}
              className="bg-rose-500 p-4 text-rose-50 rounded-xl active:bg-rose-500 hover:bg-rose-600 transition duration-300 ease-in-out cursor-pointer"
              type="button"
            >
              Next step
            </button>
            <button
              onClick={prevStep}
              className="bg-emerald-500 p-4 text-emerald-50 rounded-xl active:bg-emerald-500 hover:bg-emerald-600 transition duration-300 ease-in-out cursor-pointer"
              type="button"
            >
              Previous step
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <div className="flex flex-col gap-2">
              <textarea
                className="bg-emerald-50 p-4 rounded-xl  outline-emerald-200"
                type="text"
                name="contentTwo"
                value={formik.values.contentTwo}
                onChange={formik.handleChange}
                placeholder="Content second part..."
                rows="8"
                cols="38"
              />
              {formik.touched.contentTwo && formik.errors.contentTwo && (
                <div className="text-red-600 ">{formik.errors.contentTwo} </div>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full mx-auto">
              <input
                className="bg-emerald-50 p-4 rounded-xl focus:rounded-full outline-emerald-200"
                type="file"
                name="imageThree"
                accept="image/*"
                onChange={(e) =>
                  formik.setFieldValue("imageThree", e.currentTarget.files[0])
                }
                placeholder="Title image..."
              />
              {formik.touched.imageThree && formik.errors.imageThree && (
                <div className="text-red-600 ">{formik.errors.imageThree} </div>
              )}
            </div>
            <button
              className="bg-rose-500 p-4 text-rose-50 rounded-xl active:bg-rose-500 hover:bg-rose-600 transition duration-300 ease-in-out cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating story..." : "Create story"}{" "}
            </button>
            <button
              onClick={prevStep}
              className="bg-emerald-500 p-4 text-emerald-50 rounded-xl active:bg-emerald-500 hover:bg-emerald-600 transition duration-300 ease-in-out cursor-pointer"
              type="button"
            >
              Previous step
            </button>
          </>
        )}
      </div>
      {error && (
        <p className="text-red-800">Error creating Story, please try again</p>
      )}
    </form>
  );
}

export default CreateStoryform;
