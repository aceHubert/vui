import { Component, PluginFunction, PluginObject, DirectiveOptions } from 'vue';
import { Theme } from './services/theme';
import { Presets, VuiPreset, UserVuiPreset } from './services/presets';

export type VuiUseOptions = {
  components?: Record<string, Component>;
  directives?: Record<string, DirectiveOptions>;
  plugins?: Record<string, PluginFunction<any> | PluginObject<any>>;
};

export declare const Vui: Vui;

export interface Vui {
  framework: Framework;
  install: PluginFunction<VuiUseOptions>;
  preset: VuiPreset;
  userPreset: UserVuiPreset;
  version: string;
  // eslint-disable-next-line @typescript-eslint/no-misused-new
  new (preset?: Partial<UserVuiPreset>): Vui;
}

export interface Framework {
  preset: Presets;
  theme: Theme;
  maskZIndex: number;
}

// Public types

export type ButtonType = 'default' | 'text' | 'primary' | 'warn';
