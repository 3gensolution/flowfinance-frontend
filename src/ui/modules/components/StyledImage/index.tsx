"use client";

import { styled } from "@mui/material";
import Image, { ImageProps } from "next/image";

const CustomImage = ({
  width = 0,
  height = 0,
  alt = "",
  ...rest
}: ImageProps) => {
  return <Image width={width} height={height} alt={alt} {...rest} />;
};

/**
 * NOTE: Provide width and height for the image
 */
export const StyledImage = styled(CustomImage)(() => ({
  height: "auto",
  width: "auto",
}));
