"use client";

import { AppTextField, AppTextFieldProps } from "../AppTextField";
import { useFormikAppTextField } from "../../../common";

export type FormikAppTextFieldProps = Omit<AppTextFieldProps, "success"> & {
  validateBeforeTouch?: boolean;
  helperTextValidations?: Array<(value: string | undefined) => boolean>;
};

export const FormikAppTextField = (
  props: Omit<FormikAppTextFieldProps, "helperTextStatus" | "helperTextValidations">,
) => {
  const { field, handleChange, hasError, errorMessage } = useFormikAppTextField(props);

  return (
    <AppTextField
      {...field}
      {...props}
      onChange={handleChange}
      error={hasError}
      errorMessage={errorMessage}
    />
  );
};
