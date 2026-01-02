"use client";

import { ButtonProps, SxProps, Theme } from "@mui/material";
import { BaseButton, LargeBaseButton } from "./ui/components";
import { useAppButton } from "./common/hooks";
// import { AppButtonArrow, AppButtonArrowProps } from "../../module/components";
import { Loader } from "../Loader";

export type AppButtonProps = Omit<ButtonProps, "color"> & {
  // arrowProps?: Omit<AppButtonArrowProps, "isHovered">;
  color?: "primary" | "secondary" | "inherit";
  isLoading?: boolean;
  disableArrow?: boolean;
};

export const AppButton = ({
  variant,
  color,
  sx,
  children,
  // arrowProps,
  isLoading,
  disabled,
  size,
  disableArrow,
  ...rest
}: AppButtonProps) => {
  const { styles, loaderStyles, setIsHovered } = useAppButton({ variant, color });

  const Base = size === "large" ? LargeBaseButton : BaseButton;

  const mergedSx = {
    ...styles,
    position: "relative",
    overflow: "hidden",
    maxHeight: "50px",
    ...sx,
  } as SxProps<Theme>;

  return (
    <Base
      {...rest}
      sx={mergedSx}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled || isLoading}
    >
      {isLoading && (
        <Loader
          sx={{
            ...loaderStyles,
          }}
        />
      )}

      {!isLoading && children}

      {/* {!isLoading && !disableArrow && (
        <AppButtonArrow isHovered={isHovered} isLarge={size === "large"} {...arrowProps} />
      )} */}
    </Base>
  );
};
