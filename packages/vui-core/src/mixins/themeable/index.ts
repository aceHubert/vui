import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Themeable extends Vue {
  @Prop(Boolean) dark?: boolean;
}
