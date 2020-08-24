// Contracts
import { VuiServiceContract } from '@vui/core/types/services/index';

// Types
import Vue from 'vue';

export class Service implements VuiServiceContract {
  framework = {};

  init(_root: Vue, _ssrContext?: object) {}
}
