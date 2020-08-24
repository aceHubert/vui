import Vue from 'vue';
import Vui from '@vui/core';

Vue.use(Vui, {
  plugins: [], // 在组件页面调用
});

export function createVui(_ssrContext: any) {
  // const isDark = localStorage && localStorage.getItem(DarkThemeStorageKey) === 'true';
  // const themes =
  //   localStorage && localStorage.getItem(ThemesStorageKey) && JSON.parse(localStorage.getItem(ThemesStorageKey)!);

  const vuetify = new Vui({
    // lang: {
    //   t: (key, ...params) => i18n.t(key, ...params),
    // },
    // theme: {
    //   dark: isDark,
    //   themes: themes || DefaultThemes(),
    // },
  });

  return vuetify;
}
