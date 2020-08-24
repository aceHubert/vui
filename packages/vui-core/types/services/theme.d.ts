export interface Theme {
  dark: boolean;
  disable: boolean;
  default: string | false;
  options: {
    /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#Unsafe_inline_script */
    cspNonce?: string;
    customProperties?: boolean;
    minifyTheme?: ThemeMinifyTheme;
    themeCache?: VuiThemeCache;
  };
  themes: {
    dark: VuiThemeVariant;
    light: VuiThemeVariant;
  };
  readonly currentTheme: Partial<VuiThemeVariant>;
}

export interface ThemeOptions {
  dark?: boolean;
  disable?: boolean;
  default?: string | false;
  options?: {
    /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#Unsafe_inline_script */
    cspNonce?: string;
    customProperties?: boolean;
    minifyTheme?: ThemeMinifyTheme;
    themeCache?: VuiThemeCache;
  };
  themes?: {
    dark?: Partial<VuiThemeVariant>;
    light?: Partial<VuiThemeVariant>;
  };
}

export interface VuiThemes {
  dark: VuiThemeVariant;
  light: VuiThemeVariant;
}

export interface VuiThemeVariant {
  [name: string]: VuiThemeItem | string | number | undefined;

  primary: VuiThemeItem;
  secondary: VuiThemeItem;
  accent: VuiThemeItem;
  info: VuiThemeItem;
  warning: VuiThemeItem;
  error: VuiThemeItem;
  success: VuiThemeItem;
  anchor?: string | number;
}

export interface VuiThemeCache {
  get: (parsedTheme: VuiParsedTheme) => string | null;
  set: (parsedTheme: VuiParsedTheme, css: string) => void;
}

export interface VuiParsedTheme {
  [name: string]: VuiParsedThemeItem;
}

export interface VuiParsedThemeItem {
  [name: string]: string;

  base: string;
  lighten5: string;
  lighten4: string;
  lighten3: string;
  lighten2: string;
  lighten1: string;
  darken1: string;
  darken2: string;
  darken3: string;
  darken4: string;
}

export type VuiThemeItem = Partial<VuiParsedThemeItem> | string | number | undefined;

export type ThemeMinifyTheme = ((css: string) => string) | null;
