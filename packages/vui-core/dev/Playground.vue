<template>
  <div style="padding:10px 16px;">
    深色主题 <v-switch v-model="dark"></v-switch>
    <div>
      <a>LINKS</a>
      <v-switch></v-switch>
      <v-button type="default">Default</v-button>
      <v-button type="primary">Primary</v-button>
      <v-button type="primary" loading>Primary</v-button>
      <v-button type="primary" disabled>Primary</v-button>
      <v-button type="warn">Warn</v-button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    dark: {
      get() {
        return this.$vui.theme.dark;
      },
      set(val) {
        this.$vui.theme.dark = val;
      },
    },
  },
};
</script>
