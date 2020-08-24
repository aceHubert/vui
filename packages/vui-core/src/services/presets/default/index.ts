// Styles
import '../../../styles/index';

// Locale
// import { en } from '../../locale';

import { VuiPreset } from '@vui/core/types/services/presets';

export const preset: VuiPreset = {
  theme: {
    dark: false,
    default: 'light',
    disable: false,
    options: {
      cspNonce: undefined,
      customProperties: undefined,
      minifyTheme: undefined,
      themeCache: undefined,
    },
    themes: {
      light: {
        primary: '#07c160',
        secondary: '#424242',
        accent: '#95ec69',
        info: '#10aeff',
        success: '#91d300',
        error: '#fa5151',
        warning: '#fa9d3b',
      },
      dark: {
        primary: '#02c660',
        secondary: '#424242',
        accent: '#3eb575',
        info: '#10aeff',
        success: '#74a800',
        error: '#fa5151',
        warning: '#c87d2f',
      },
    },
  },
  maskZIndex: 3000,
};
