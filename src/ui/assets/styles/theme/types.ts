import "@mui/material/styles";

export type ButtonStateStyle = {
  background: string;
  border: string;
  color: string;
  hoverBackground: string;
  hoverColor: string;
  hoverBorder: string;
};

export type ButtonVariantStyle = {
  primary: ButtonStateStyle;
  secondary: ButtonStateStyle;
  inherit: ButtonStateStyle;
};

export type ButtonStyle = {
  contained: ButtonVariantStyle;
  outlined: ButtonVariantStyle;
  text: ButtonVariantStyle;
};

export type TextFieldStateStyle = {
  colors: {
    background: string;
    placeholder: string;
    text: string;
    label: string;
    border: string;
    error: string;
  };
};

export type TextFieldVariantStyle = {
  default: TextFieldStateStyle;
  focused: TextFieldStateStyle;
};

export type TextFieldStyle = {
  filled: TextFieldVariantStyle;
  outlined: TextFieldVariantStyle;
};

export interface BaseThemeExtension {
  // color: {
  //   success1: string;
  //   success2: string;
  //   error1: string;
  //   error2: string;
  // };
  font: {
    body: string;
  };
  button: ButtonStyle;
  textField: TextFieldStyle;
}


interface ThemeExtension extends BaseThemeExtension {
  /**
   * Dummy field to avoid `no-empty-object-type` lint error
   */
  _augmentedBrand?: never; // remove when you are set to theme
}

declare module "@mui/material/styles" {
  interface Theme extends ThemeExtension {
    /**
     * Dummy field to avoid `no-empty-object-type` lint error
     */
    _augmentedBrand?: never;
  }

  interface ThemeOptions extends ThemeExtension {
    /**
     * Same dummy field for ThemeOptions
     */
    _augmentedBrand?: never;
  }
}

export {};
