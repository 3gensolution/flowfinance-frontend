"use client";

import {
  Box,
  BoxProps,
  Collapse,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
  Typography,
} from "@mui/material";
import { RowStack } from "../../../../RowStack";
import { useTextFieldStyles } from "../../../common";

export type AppTextFieldProps = TextFieldProps & {
  borderRadius?: string;
  borderWidth?: string;
  padding?: Record<string, unknown>;
  fontSize?: Record<string, unknown>;
  marginTop?: Record<string, string> | string;
  errorMessage?: string;
  themeVariant?: TextFieldProps["variant"];
  boxProps?: BoxProps;
  success?: boolean;
  helperTextStatus?: Record<number, "default" | "error" | "success">;
};

export const AppTextField = (props: AppTextFieldProps) => {
  const {
    error,
    success,
    marginTop = {
      xs: "0",
    },
    errorMessage,
    helperText,
    helperTextStatus = {},
    borderRadius,
    borderWidth,
    padding,
    fontSize,
    boxProps,
    themeVariant,
    ...rest
  } = props;
  const styles = useTextFieldStyles({
    ...props,
    borderRadius,
    borderWidth,
    padding,
    fontSize,
    themeVariant,
    success,
  });
  const { sx: boxSx, ...restBoxProps } = boxProps || {};

  const getHelperTextColor = (index: number) => {
    const status = helperTextStatus[index] || (error ? "error" : success ? "success" : "default");

    switch (status) {
      case "error":
        return "#D87759";
      case "success":
        return "#008500";
      default:
        return "#636363";
    }
  };

  const renderHelperTexts = () => {
    if (!Array.isArray(helperText)) {
      return helperText;
    }
  
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: 1,
          width: "100%",
          mt: '8px'
        }}
      >
        {helperText.map((text, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 0.5,
            }}
          >
            <Box
              component="span"
              sx={{
                display: "inline-block",
                width: 5,
                height: 5,
                borderRadius: "50%",
                backgroundColor: getHelperTextColor(index),
                mr: 0.5,
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: getHelperTextColor(index),
                fontSize: { xs: ".75rem", md: ".75rem" },
                fontWeight: 400,
                fontFamily: "Inter, sans-serif",
                lineHeight: "18px",
              }}
            >
              {text}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };
  

  // Create a combined sx style object for the TextField
  const textFieldStyles: SxProps<Theme> = {
    ...(styles as Record<string, unknown>),
    ...((rest.sx as Record<string, unknown>) || {}),
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginTop,
        ...((boxSx as Record<string, unknown>) || {}),
      }}
      {...restBoxProps}
    >
      <TextField {...rest} sx={textFieldStyles} id="outlined-error-helper-text" helperText={null} />

      {helperText && renderHelperTexts()}

      <Collapse in={error} orientation={"vertical"}>
        <RowStack
          sx={{
            width: "100%",
            mt: "6px",
          }}
          justifyContent={"flex-start"}
        >
          <Typography
            variant={"body1"}
            sx={{
              color: "#D87759",
              fontSize: { xs: ".875rem", md: ".875rem" },
              fontWeight: 500,
            }}
          >
            {errorMessage}
          </Typography>
        </RowStack>
      </Collapse>
    </Box>
  );
};
