import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'weui-demo-loadmore',
})
export default class DemoLoadmore extends Vue {
  render() {
    return (
      <div class="weui-demo demo-loadmore">
        <v-loadmore loading></v-loadmore>
        <v-loadmore loading>正在加载</v-loadmore>
        <v-loadmore line>分隔线</v-loadmore>
        <v-loadmore line></v-loadmore>
      </div>
    );
  }
}
