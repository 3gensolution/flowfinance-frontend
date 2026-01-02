"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";

const StyledInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// Use a type alias instead of a no-op interface
export type VisuallyHiddenInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function VisuallyHiddenInput(props: VisuallyHiddenInputProps) {
  return <StyledInput {...props} />;
}
