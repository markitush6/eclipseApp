interface ColorPalette {
  primary: string;
  secondary: string;
  grey: string;
  danger: string;
  white: string;
  black: string;
}
export type ColorType = ColorPalette;

const colors: ColorPalette = {
  primary: "#7FC1A5",
  secondary: "#DFF4E7",
  grey: "#808080",
  danger: "#dc3545",
  white: "#ffffff",
  black: "#000000",
};
export default colors;
