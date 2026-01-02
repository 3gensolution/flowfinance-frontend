import { FormikAppTextFieldProps } from "../../../ui/components";
import { FieldInputProps, useField } from "formik";
import { ChangeEvent } from "react";

export interface useFormikAppTextFieldReturnType {
  field: FieldInputProps<any>;
  handleChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  hasError: boolean;
  errorMessage: string | undefined;
  isSuccess: boolean;
}

export const useFormikAppTextField = ({
  validateBeforeTouch,
  ...props
}: FormikAppTextFieldProps): useFormikAppTextFieldReturnType => {
  const [field, meta] = useField(props.name as string);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    // We allow any custom value transformation before validation
    props.onChange?.(event);
    field.onChange(event);
  };

  const hasError = !!((validateBeforeTouch || meta.touched) && meta.error);
  const errorMessage = (validateBeforeTouch || meta.touched) && meta.error ? meta.error : undefined;
  const isSuccess = meta.touched && !meta.error && !!field.value;

  return {
    field,
    handleChange,
    hasError,
    errorMessage,
    isSuccess,
  };
};
