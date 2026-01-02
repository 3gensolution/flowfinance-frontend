import { useState } from "react";

export interface UseAppPasswordFieldProps {
  obscurePassword: boolean;
  handleVisibilityButtonClicked: () => void;
}

export const useAppPasswordField = (): UseAppPasswordFieldProps => {
  const [obscurePassword, setObscurePassword] = useState(true);

  const handleVisibilityButtonClicked = (): void => {
    setObscurePassword(!obscurePassword);
  };

  return {
    obscurePassword,
    handleVisibilityButtonClicked,
  };
};
