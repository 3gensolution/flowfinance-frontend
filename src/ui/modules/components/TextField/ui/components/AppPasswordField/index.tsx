import { pxToRem } from "@/common/utils";
import { AppTextField, AppTextFieldProps } from "../AppTextField";
import { useAppPasswordField } from "./common/hooks";
import { Box } from "@mui/material";

export type AppPasswordFieldProps = Omit<AppTextFieldProps, "hel">;

export const AppPasswordField = (props: AppPasswordFieldProps) => {
  const { obscurePassword, handleVisibilityButtonClicked } = useAppPasswordField();

  return (
    <AppTextField
      {...props}
      type={obscurePassword ? "password" : "text"}
      InputProps={{
        endAdornment: (
          <Box
            component="span"
            onClick={handleVisibilityButtonClicked}
            sx={{
              color: "#636363",
              fontSize: pxToRem(16),
              fontWeight: 400,
              fontFamily: "Inter, sans-serif",
              cursor: "pointer",
              userSelect: "none",
              padding: "4px 8px",
              textDecoration: "underline",
              "&:hover": {
                textDecoration: "none",
              },
            }}
          >
            {obscurePassword ? "Show" : "Hide"}
          </Box>
        ),
      }}
    />
  );
};
