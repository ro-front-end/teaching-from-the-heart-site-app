// CreateStoryform.jsx

import { useFormik } from "formik";
import {
  createStorySchema,
  initialValues,
} from "../validations/createStory.form";
import { useState } from "react";
import { uploadImage } from "../utils/uploadImages";
import { useCreateStoryMutation } from "../services/stories";
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
      }
    },
  });

  const nextStep = async () => {
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

    const currentStepFields = Object.keys(touchedFields);
    const hasErrors = currentStepFields.some((field) => errors[field]);

    if (!hasErrors && step < 3) {
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white rounded-xl p-6 sm:p-8 md:p-10 max-w-3xl w-full mx-auto flex flex-col gap-6 shadow-lg"
    >
      {/* Título del paso */}
      <h3 className="text-rose-500 uppercase font-bold text-2xl text-center mb-4">
        Create a story - Step {step}
      </h3>

      {/* Contenido por paso */}
      <div className="flex flex-col gap-6 w-full">
        {step === 1 && (
          <>
            {/* Título */}
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                placeholder="Title..."
                className="w-full p-4 bg-emerald-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-red-600 text-sm">{formik.errors.title}</p>
              )}
            </div>

            {/* Imagen 1 */}
            <div className="flex flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  formik.setFieldValue("imageOne", e.currentTarget.files[0])
                }
                className="w-full p-4 bg-emerald-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
              {formik.touched.imageOne && formik.errors.imageOne && (
                <p className="text-red-600 text-sm">{formik.errors.imageOne}</p>
              )}
            </div>

            {/* Botones */}
            <button
              type="button"
              onClick={nextStep}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium p-4 rounded-xl transition"
            >
              Next Step
            </button>
            <button
              type="button"
              onClick={() => onChangeView(0)}
              className="w-full bg-neutral-300 hover:bg-neutral-400 text-gray-800 font-medium p-4 rounded-xl transition"
            >
              Cancel
            </button>
          </>
        )}

        {step === 2 && (
          <>
            {/* Contenido 1 */}
            <div className="flex flex-col gap-2">
              <textarea
                name="contentOne"
                value={formik.values.contentOne}
                onChange={formik.handleChange}
                placeholder="Content part one..."
                rows="6"
                className="w-full p-4 bg-emerald-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 resize-none"
              />
              {formik.touched.contentOne && formik.errors.contentOne && (
                <p className="text-red-600 text-sm">
                  {formik.errors.contentOne}
                </p>
              )}
            </div>

            {/* Imagen 2 */}
            <div className="flex flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  formik.setFieldValue("imageTwo", e.currentTarget.files[0])
                }
                className="w-full p-4 bg-emerald-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
              {formik.touched.imageTwo && formik.errors.imageTwo && (
                <p className="text-red-600 text-sm">{formik.errors.imageTwo}</p>
              )}
            </div>

            {/* Botones */}
            <button
              type="button"
              onClick={nextStep}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium p-4 rounded-xl transition"
            >
              Next Step
            </button>
            <button
              type="button"
              onClick={prevStep}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium p-4 rounded-xl transition"
            >
              Previous Step
            </button>
          </>
        )}

        {step === 3 && (
          <>
            {/* Contenido 2 */}
            <div className="flex flex-col gap-2">
              <textarea
                name="contentTwo"
                value={formik.values.contentTwo}
                onChange={formik.handleChange}
                placeholder="Content part two..."
                rows="6"
                className="w-full p-4 bg-emerald-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 resize-none"
              />
              {formik.touched.contentTwo && formik.errors.contentTwo && (
                <p className="text-red-600 text-sm">
                  {formik.errors.contentTwo}
                </p>
              )}
            </div>

            {/* Imagen 3 */}
            <div className="flex flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  formik.setFieldValue("imageThree", e.currentTarget.files[0])
                }
                className="w-full p-4 bg-emerald-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
              {formik.touched.imageThree && formik.errors.imageThree && (
                <p className="text-red-600 text-sm">
                  {formik.errors.imageThree}
                </p>
              )}
            </div>

            {/* Botones */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium p-4 rounded-xl transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating..." : "Create Story"}
            </button>
            <button
              type="button"
              onClick={prevStep}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium p-4 rounded-xl transition"
            >
              Previous Step
            </button>
          </>
        )}
      </div>

      {/* Mensaje de error general */}
      {error && (
        <p className="text-red-800 text-center mt-4">
          Error creating story. Please try again.
        </p>
      )}
    </form>
  );
}

export default CreateStoryform;
