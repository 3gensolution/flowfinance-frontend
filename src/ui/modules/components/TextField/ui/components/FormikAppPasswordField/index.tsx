import { FormikAppTextFieldProps } from "../FormikAppTextField";
import { useFormikAppTextField } from "../../../common";
import { AppPasswordField } from "../AppPasswordField";
import { useMemo } from "react";

export type FormikAppPasswordFieldProps = FormikAppTextFieldProps;

export const FormikAppPasswordField = (props: FormikAppPasswordFieldProps) => {
  const { helperText, helperTextValidations = [], ...restProps } = props;
  const { field, handleChange, hasError, errorMessage, isSuccess } =
    useFormikAppTextField(restProps);

  const helperTextStatus = useMemo(() => {
    if (!Array.isArray(helperText) || field.value === undefined) {
      return {};
    }

    const result: Record<number, "default" | "error" | "success"> = {};
    if (Array.isArray(helperText)) {
      helperText.forEach((_, index) => {
        if (
          index < helperTextValidations.length &&
          field.value !== undefined &&
          field.value !== null
        ) {
          const validationFn = helperTextValidations[index];
          if (validationFn) {
            const isValid = validationFn(field.value);
            result[index] = isValid ? "success" : "error";
          } else {
            result[index] = hasError ? "error" : isSuccess ? "success" : "default";
          }
        } else {
          result[index] = hasError ? "error" : isSuccess ? "success" : "default";
        }
      });
    }

    return result;
  }, [helperText, helperTextValidations, field.value, hasError, isSuccess]);

  return (
    <AppPasswordField
      {...field}
      {...restProps}
      onChange={handleChange}
      error={hasError}
      errorMessage={errorMessage}
      helperText={helperText}
      helperTextStatus={helperTextStatus}
    />
  );
};
