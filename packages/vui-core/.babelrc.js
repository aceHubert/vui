const vuetifyPackage = require('./package.json');

module.exports = {
  presets: [['@vue/babel-preset-app', { absoluteRuntime: false }]],
  plugins: [
    [
      'transform-define',
      {
        __VUI_VERSION__: vuetifyPackage.version,
        __REQUIRED_VUE__: vuetifyPackage.peerDependencies.vue,
      },
    ],
  ],
};
