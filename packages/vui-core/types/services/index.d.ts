import Vue from 'vue';
import Framework from '../';
import { VuiPreset } from './presets';

export interface VuiServiceContract {
  framework: Record<string, VuiServiceContract>;
  init: (root: Vue, ssrContext?: object) => void;
}

export interface VuiService {
  property: string;
  new (preset: VuiPreset, parent: InstanceType<typeof Framework>): VuiServiceContract;
}
