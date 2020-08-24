import { Vue, Component } from 'vue-property-decorator';
import { AlertPlugin, AlertModule } from '@vui/core/lib';

Vue.use(AlertPlugin, { zIndex: 2000 });

@Component({
  name: 'weui-demo-alert',
})
export default class DemoAlert extends Vue {
  show1: boolean = false;
  show2: boolean = false;
  show3: boolean = false;

  handlePluginExec() {
    this.$vui.alert.show({
      title: 'Plugin Title',
      content: 'Plugin Content',
      buttonText: 'Close',
      onShow: () => {
        // console.log('show')
      },
      onHide: () => {
        // console.log('hide')
      },
    });
  }

  handlePluginTimeout() {
    this.$vui.alert.show({
      title: 'Plugin Title',
      content: 'Timeout 3s',
      buttonText: 'Close',
      onShow: () => {
        // console.log('show')
      },
      onHide: () => {
        // console.log('hide')
      },
    });

    setTimeout(() => {
      this.$vui.alert.hide();
    }, 3000);
  }

  handleModuleExec() {
    AlertModule.show({
      title: 'Plugin Title',
      content: 'Plugin Content',
      buttonText: 'Close',
      onShow: () => {
        // console.log('show')
      },
      onHide: () => {
        // console.log('hide')
      },
    });
  }

  handleModuleTimeout() {
    AlertModule.show({
      title: 'Plugin Title',
      content: 'Timeout 3s',
      buttonText: 'Close',
      onShow: () => {
        // console.log('show')
      },
      onHide: () => {
        // console.log('hide')
      },
    });

    setTimeout(() => {
      AlertModule.hide();
    }, 3000);
  }

  render() {
    return (
      <div class="weui-demo demo-alert">
        <h2>v-alert</h2>
        <h3>警告框</h3>
        <div class="content no-padding">
          <v-group>
            <v-cell-switch label="default" vModel={this.show1}></v-cell-switch>
            <v-cell-switch label="closeOnClickMask" vModel={this.show2}></v-cell-switch>
            <v-cell-switch label="slot" vModel={this.show3}></v-cell-switch>
          </v-group>

          <div class="padding">
            <p>Plugin</p>
            <v-button type="primary" onClick={this.handlePluginExec.bind(this)}>
              Show
            </v-button>
            <v-button type="primary" onClick={this.handlePluginTimeout.bind(this)}>
              Timeout 3s
            </v-button>
          </div>

          <div class="padding">
            <p>Module</p>
            <v-button type="primary" onClick={this.handleModuleExec.bind(this)}>
              Show
            </v-button>
            <v-button type="primary" onClick={this.handleModuleTimeout.bind(this)}>
              Timeout 3s
            </v-button>
          </div>

          {/* .sync jsx写法 */}
          <v-alert
            show={this.show1}
            title="弹窗标题"
            content="弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内"
            buttonText="关闭"
            maskZIndex={3000}
            {...{
              on: {
                'update:show': (val: boolean) => {
                  this.show1 = val;
                },
              },
            }}
          ></v-alert>
          <v-alert
            show={this.show2}
            title="弹窗标题"
            content="弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内"
            closeOnClickMask
            {...{
              on: {
                'update:show': (val: boolean) => {
                  this.show2 = val;
                },
              },
            }}
            onShow={() => {
              // console.log('show')
            }}
            onHide={() => {
              // console.log('hide')
            }}
          ></v-alert>
          <v-alert
            show={this.show3}
            closeOnClickMask
            {...{
              on: {
                'update:show': (val: boolean) => {
                  this.show3 = val;
                },
              },
            }}
          >
            <span slot="title">slot title</span>
            <p style="color:red;">slot default content</p>
            <p style="color:red;">slot default content</p>
            <p style="color:red;">slot default content</p>
            <p style="color:red;">slot default content</p>
            <p style="color:red;">slot default content</p>
            <p style="color:red;">slot default content</p>
          </v-alert>
        </div>
      </div>
    );
  }
}
