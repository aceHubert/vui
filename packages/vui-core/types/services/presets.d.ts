import { Theme, ThemeOptions } from './theme';

export interface VuiPreset {
  // breakpoint: {
  //   scrollBarWidth: Breakpoint['scrollBarWidth'];
  //   thresholds: Breakpoint['thresholds'];
  // };
  // icons: {
  //   iconfont: Icons['iconfont'];
  //   // TODO: Remove partial for v3
  //   values: Partial<Icons['values']>;
  // };
  // lang: {
  //   current: Lang['current'];
  //   locales: Lang['locales'];
  //   t: Lang['t'];
  // };
  theme: {
    dark: Theme['dark'];
    default: Theme['default'];
    disable: Theme['disable'];
    options: Theme['options'];
    themes: Theme['themes'];
  };
  maskZIndex: number;
  [name: string]: any;
}

export interface UserVuiPreset extends GlobalVuiPreset {
  preset?: GlobalVuiPreset;

  [name: string]: any;
}

export interface GlobalVuiPreset {
  // breakpoint?: BreakpointOptions;
  // icons?: IconsOptions;
  // lang?: LangOptions;
  theme?: ThemeOptions;

  [name: string]: any;
}

export interface Presets {
  preset: UserVuiPreset;
}
