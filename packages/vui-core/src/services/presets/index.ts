import mergeDeep from 'lodash.merge';
import { warn } from '@vue-async/utils';
import { Service } from '../base';

// Default Preset
import { preset as Preset } from './default';

// Types
import Framework from '@vui/core/types';
import { VuiPreset, UserVuiPreset } from '@vui/core/types/services/presets';

export class Presets extends Service {
  static property: 'preset' = 'preset';

  constructor(parentPreset: Partial<UserVuiPreset>, parent: InstanceType<typeof Framework>) {
    super();

    // The default preset
    const defaultPreset = mergeDeep({}, Preset);
    // The user provided preset
    const { userPreset } = parent;
    // The user provided global preset
    const { preset: globalPreset = {}, ...preset } = userPreset;

    warn(globalPreset.preset === null, 'Global presets do not support the **preset** option, it can be safely omitted');

    parent.preset = mergeDeep(mergeDeep(defaultPreset, globalPreset), preset) as VuiPreset;
  }
}
