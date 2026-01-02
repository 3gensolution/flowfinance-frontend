import { pxToRem } from "@/common/utils";
import { Typography } from "@mui/material";

type AppLabelProps = {
  label: string;
};

export function AppLabel({ label }: AppLabelProps) {
  return (
    <Typography
      sx={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
        fontSize: pxToRem(14),
        lineHeight: "20px",
        color: (theme) => theme.palette.text.primary,
      }}
    >
      {label}
    </Typography>
  );
}
