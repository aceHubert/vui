import { install } from './install';

// Types
import Vue from 'vue';
import { VuiPreset, UserVuiPreset } from '@vui/core/types/services/presets';
import { VuiService, VuiServiceContract } from '@vui/core/types/services';

// Services
import * as services from './services';

export default class Vui {
  static install = install;

  static installed = false;

  static version = __VUI_VERSION__;

  framework: Record<string, VuiServiceContract> = {};

  public installed: string[] = [];

  public preset = {} as VuiPreset;

  public userPreset: UserVuiPreset = {};

  constructor(userPreset: UserVuiPreset = {}) {
    this.userPreset = userPreset;

    this.use(services.Presets);
    this.use(services.Theme);
  }

  // Called on the new vuetify instance
  // bootstrap in install beforeCreate
  // Exposes ssrContext if available
  init(root: Vue, ssrContext?: object) {
    this.installed.forEach((property) => {
      const service = this.framework[property];

      service.framework = this.framework;

      service.init(root, ssrContext);
    });
  }

  // Instantiate a VuIService
  use(Service: VuiService) {
    const property = Service.property;

    if (this.installed.includes(property)) return;

    // TODO maybe a specific type for arg 2?
    this.framework[property] = new Service(this.preset, this as any);
    this.installed.push(property);
  }
}
