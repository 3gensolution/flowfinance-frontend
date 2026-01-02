"use client";

import { styled } from "@mui/material/styles";
import Button, { ButtonProps, ButtonTypeMap } from "@mui/material/Button";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { pxToRem } from "@/common/utils";

// Create the raw styled "large" button, similar to BaseButton but bigger
const RawLargeBaseButton = styled(Button)<ButtonProps>(() => ({
  borderRadius: "8px",
  textTransform: "none",
  padding: "16px 32px",
  fontSize: pxToRem(18),
  boxShadow: "none",
  fontWeight: 600,
  lineHeight: "28px",
}));

type MUIButtonOverridable = OverridableComponent<ButtonTypeMap<object, "button">>;

// Cast the raw styled button to the public type
export const LargeBaseButton = RawLargeBaseButton as MUIButtonOverridable;
