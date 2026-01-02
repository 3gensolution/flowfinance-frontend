import { AppTextFieldProps } from "../../../ui/components";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import { SxProps, Theme } from "@mui/system";

export const useTextFieldStyles = ({
  borderRadius = "8px",
  borderWidth = "1px",
  padding = {
    xs: "12px 16px !important",
    sm: "12px 16px !important",
  },
  fontSize = {
    xs: "0.875rem",
    md: "0.875rem",
  },
  variant = "outlined",
  themeVariant = variant,
  error,
  success,
}: Pick<
  AppTextFieldProps,
  "borderRadius" | "borderWidth" | "padding" | "fontSize" | "themeVariant" | "error" | "success" | "variant"
>): SxProps<Theme> => {
  const { textField } = useTheme();

  return useMemo((): SxProps<Theme> => {
    const textFieldVariant = themeVariant as keyof typeof textField;
    const stateStyle = textField[textFieldVariant];
    const {
      background: defaultBackground,
      border: defaultBorder,
      text: defaultText,
      placeholder: defaultPlaceholder,
      error: defaultError,
    } = stateStyle.default.colors;

    const {
      background: focusedBackground,
      border: focusedBorder,
      text: focusedText,
      placeholder: focusedPlaceholder,
    } = stateStyle.focused.colors;

     const successColor = "#4CAF50";

    const resolveBorderColor = (isFocused: boolean): string => {
      if (error) {
        return defaultError;
      }
      if (success) {
        return successColor;
      }
      if (isFocused) {
        return focusedBorder;
      }
      return defaultBorder;
    };
    
    return {
      width: "100%",
      backgroundColor: defaultBackground,
      borderRadius: borderRadius,

      "& .MuiInputBase-input": {
        fontWeight: 400,
        fontSize: fontSize,
        color: defaultText,
        borderRadius: borderRadius,
        padding: padding,
        lineHeight: "20px",

        "&::placeholder": {
          color: defaultPlaceholder,
          fontWeight: 400,
          fontSize: fontSize,
          opacity: 1,
        },
        "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
          {
            transition: "background-color 600000s 0s, color 600000s 0s",
          },
        "&[data-autocompleted]": {
          backgroundColor: "transparent !important",
        },
        "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
          WebkitAppearance: "none",
          margin: 0,
        },
      },

      "& .MuiOutlinedInput-root": {
        // padding: padding,
        "& fieldset": {
          borderRadius: borderRadius,
          border: `${borderWidth} solid ${resolveBorderColor(false)}`,
        },
        "&:hover fieldset": {
          border: `${borderWidth} solid ${resolveBorderColor(true)}`,
        },
        "&.Mui-focused": {
          color: focusedText,
          backgroundColor: focusedBackground,

          "& fieldset": {
            border: `${borderWidth} solid ${resolveBorderColor(true)}`,
          },
          "&::placeholder": {
            color: focusedPlaceholder,
          },
        },
      },

      "& .MuiFilledInput-root": {
        backgroundColor: defaultBackground,
        borderRadius: borderRadius,
        "&:before": {
          borderBottom: `${borderWidth} solid ${defaultBorder}`,
        },
        "&:hover:before": {
          borderBottom: `${borderWidth} solid ${resolveBorderColor(false)}`,
        },
        "&.Mui-focused": {
          backgroundColor: focusedBackground,

          "&:after": {
            borderBottom: `${borderWidth} solid ${resolveBorderColor(true)}`,
          },
          "&::placeholder": {
            color: focusedPlaceholder,
          },
        },
      },
    };
  }, [themeVariant, error, borderRadius, fontSize, padding, borderWidth, textField]);
};
