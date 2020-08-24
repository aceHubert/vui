import { Vue, Component } from 'vue-property-decorator';
import { ConfirmPlugin, ConfirmModule } from '@vui/core/lib';

Vue.use(ConfirmPlugin, { zIndex: 2001 });

@Component({
  name: 'weui-demo-confirm',
})
export default class DemoConfirm extends Vue {
  show1: boolean = false;
  show2: boolean = false;
  show3: boolean = false;
  show4: boolean = false;
  show5: boolean = false;
  show6: boolean = false;
  show7: boolean = false;

  handlePluginExec() {
    this.$vui.confirm.show({
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
    this.$vui.confirm.show({
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
      this.$vui.confirm.hide();
    }, 3000);
  }

  handlePluginPrompt() {
    this.$vui.confirm.prompt('username', {
      title: 'Username',
      onShow: () => {
        // console.log('show')
      },
      onHide: () => {
        // console.log('hide')
      },
      onConfirm: (val: string) => {
        alert(val);
      },
    });
  }

  handlePluginSetValue() {
    this.$vui.confirm.prompt('username', {
      title: 'Username',
      onShow: () => {
        this.$vui.confirm.setInputValue('default value', true);
      },
      onHide: () => {
        // console.log('hide')
      },
      onConfirm: (val: string) => {
        alert(val);
        this.$vui.confirm.setInputValue('');
      },
    });
  }

  handlePluginSetFocus() {
    this.$vui.confirm.prompt('username', {
      title: 'Username',
      onShow: () => {
        this.$vui.confirm.setInputFocus();
      },
      onHide: () => {
        // console.log('hide')
      },
    });
  }

  handleModuleExec() {
    ConfirmModule.show({
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
    ConfirmModule.show({
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
      ConfirmModule.hide();
    }, 3000);
  }

  render() {
    return (
      <div class="weui-demo demo-confirm">
        <h2>v-confirm</h2>
        <h3>确认框</h3>
        <div class="content no-padding">
          <v-group>
            <v-cell-switch label="default" vModel={this.show1}></v-cell-switch>
            <v-cell-switch label="closeOnClickMask" vModel={this.show2}></v-cell-switch>
            <v-cell-switch label="slot" vModel={this.show3}></v-cell-switch>
            <v-cell-switch label="prompt" vModel={this.show4}></v-cell-switch>
            <v-cell-switch label="hide cancel button" vModel={this.show5}></v-cell-switch>
            <v-cell-switch label="stop auto close" vModel={this.show6}></v-cell-switch>
            <v-cell-switch label="android style" vModel={this.show7}></v-cell-switch>
          </v-group>

          <div class="padding">
            <p>Plugin</p>
            <v-button type="primary" onClick={this.handlePluginExec.bind(this)}>
              Show
            </v-button>
            <v-button type="primary" onClick={this.handlePluginTimeout.bind(this)}>
              Timeout 3s
            </v-button>
            <v-button type="primary" onClick={this.handlePluginPrompt.bind(this)}>
              prompt
            </v-button>
            <v-button type="primary" onClick={this.handlePluginSetValue.bind(this)}>
              set input default value
            </v-button>
            <v-button type="primary" onClick={this.handlePluginSetFocus.bind(this)}>
              focus input
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
          <v-confirm
            show={this.show1}
            title="弹窗标题"
            content="弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内"
            confirmText="确认"
            cancelText="关闭"
            maskZIndex={3000}
            {...{
              on: {
                'update:show': (val: boolean) => {
                  this.show1 = val;
                },
              },
            }}
          ></v-confirm>
          <v-confirm
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
          ></v-confirm>
          <v-confirm
            show={this.show3}
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
          </v-confirm>
          <v-confirm
            show={this.show4}
            showInput
            {...{
              on: {
                'update:show': (val: boolean) => {
                  this.show4 = val;
                },
                confirm: (val: string) => {
                  alert(val);
                },
              },
            }}
          ></v-confirm>
          <v-confirm
            show={this.show5}
            showCancelv-button={false}
            content="Content"
            {...{
              on: {
                'update:show': (val: boolean) => {
                  this.show5 = val;
                },
              },
            }}
          ></v-confirm>
          <v-confirm
            show={this.show6}
            closeOnv-confirm={false}
            content="close in 2s later"
            {...{
              on: {
                'update:show': (val: boolean) => {
                  this.show6 = val;
                },
                confirm: () => {
                  setTimeout(() => {
                    this.show6 = false;
                  }, 2000);
                },
              },
            }}
          ></v-confirm>

          <v-confirm
            show={this.show7}
            theme="android"
            title="弹窗标题"
            content="弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内"
            confirmText="确认"
            cancelText="辅助操作"
            {...{
              on: {
                'update:show': (val: boolean) => {
                  this.show7 = val;
                },
              },
            }}
          ></v-confirm>
        </div>
      </div>
    );
  }
}
