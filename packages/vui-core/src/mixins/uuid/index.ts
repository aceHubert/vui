import { Vue, Component } from 'vue-property-decorator';

function createId() {
  return Math.random().toString(36).substring(3, 8);
}

@Component
export default class Uuid extends Vue {
  uuid: string = createId();
  createUuid() {
    return createId();
  }
}
