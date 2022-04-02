export type ColorMode = "light" | "dark";

export type ThemeContextState = {
    mode: ColorMode;
    toggleColorMode: () => void;
}