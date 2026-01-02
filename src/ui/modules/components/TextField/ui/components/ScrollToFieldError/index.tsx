import { FormikErrors, useFormikContext } from "formik";
import { useEffect } from "react";

// Define a type for the result array
type ErrorPath = string;

const getFieldErrorNames = (formikErrors: FormikErrors<unknown>): ErrorPath[] => {
  const transformObjectToDotNotation = (
    obj: Record<string, unknown>,
    prefix = "",
    result: ErrorPath[] = [],
  ): ErrorPath[] => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (!value) return;

      const nextKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "object") {
        transformObjectToDotNotation(value as Record<string, unknown>, nextKey, result);
      } else {
        result.push(nextKey);
      }
    });

    return result;
  };

  return transformObjectToDotNotation(formikErrors as Record<string, unknown>);
};

export const ScrollToFieldError = () => {
  const { submitCount, isValid, errors } = useFormikContext();

  useEffect(() => {
    if (isValid || !submitCount) return;

    const fieldErrorNames = getFieldErrorNames(errors);
    if (fieldErrorNames.length <= 0) return;

    let element = document.querySelector(`input[name='${fieldErrorNames[0]}']`);

    if (!element) {
      element = document.querySelector(`textarea[name='${fieldErrorNames[0]}']`);
    }

    if (!element) return;

    // Scroll to first known error into view
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [errors, isValid, submitCount]);

  return null;
};
