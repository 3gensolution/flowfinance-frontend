"use client";

import { styled } from "@mui/material/styles";
import Button, { ButtonProps, ButtonTypeMap } from "@mui/material/Button";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { pxToRem } from "@/common/utils";

// Create the raw styled button
const RawBaseButton = styled(Button)<ButtonProps>(() => ({
  borderRadius: "8px",
  textTransform: "none",
  padding: "12px 24px",
  fontSize: pxToRem(16),
  boxShadow: "none",
  fontWeight: 500,
  lineHeight: "24px",
}));

// Use `object` instead of {} to allow normal button event props (like onMouseEnter)
type MUIButtonOverridable = OverridableComponent<ButtonTypeMap<object, "button">>;

// Cast the raw styled button to the public type
export const BaseButton = RawBaseButton as MUIButtonOverridable;
