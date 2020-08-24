import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'weui-demo-app',
})
export default class App extends Vue {
  render() {
    return <router-view />;
  }
}
