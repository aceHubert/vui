import { Vue, Component } from 'vue-property-decorator';
import { LoadingPlugin, LoadingModule } from '@vui/core/lib';

Vue.use(LoadingPlugin, { zIndex: 2002 });

function tick(i: number, cb: (present: number) => void) {
  setTimeout(function () {
    i++;
    cb(i);
    if (i < 100) {
      tick(i, cb);
    }
  }, 50);
}

@Component({
  name: 'weui-demo-loading',
})
export default class DemoLoading extends Vue {
  show1: boolean = false;
  show2: boolean = false;
  text1: string = '';

  showLoading() {
    LoadingModule.show({
      text: 'v-loading...',
    });

    setTimeout(() => {
      LoadingModule.hide();
    }, 2000);
  }

  showDelayLoading() {
    LoadingModule.show({
      text: 'v-loading',
      delay: 1e3,
    });
    setTimeout(() => {
      LoadingModule.hide();
    }, 2000);
  }

  handleShow1(val: boolean) {
    if (val) {
      tick(0, (percent) => {
        if (percent === 100) {
          this.show1 = false;
          return;
        }
        this.text1 = `${percent}%`;
      });
    }
  }

  handleShow2(val: boolean) {
    if (val) {
      tick(0, (percent) => {
        if (percent === 100) {
          this.show2 = false;
        }
      });
    }
  }

  render() {
    return (
      <div class="weui-demo demo-loading">
        <v-group>
          <v-cell-switch label="show" vModel={this.show1} onChange={this.handleShow1.bind(this)}></v-cell-switch>
          <v-cell-switch label="no text" vModel={this.show2} onChange={this.handleShow2.bind(this)}></v-cell-switch>
        </v-group>

        <v-loading
          show={this.show1}
          text={this.text1}
          onChange={(val: any) => {
            console.log(val);
          }}
        ></v-loading>
        <v-loading show={this.show2}></v-loading>

        <div style="padding: 10px 16px;">
          <v-button type="primary" onClick={this.showLoading.bind(this)}>
            show 2 seconds
          </v-button>
          <v-button type="primary" onClick={this.showDelayLoading.bind(this)}>
            delay 1 second
          </v-button>
        </div>
      </div>
    );
  }
}
