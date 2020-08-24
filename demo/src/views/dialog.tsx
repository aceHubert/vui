import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'weui-demo-actionsheet',
})
export default class DemoDialog extends Vue {
  default: boolean = false;
  show3: boolean = false;

  render() {
    return (
      <div class="weui-demo demo-dialog">
        <h2>v-dialog</h2>
        <h3>对话框</h3>
        <div class="content no-padding">
          <v-group>
            <v-cell-switch label="default" vModel={this.default}></v-cell-switch>
            <v-cell-switch label="close on click mask" vModel={this.show3}></v-cell-switch>
          </v-group>

          <v-dialog show={this.default}>
            <div class="weui-dialog__hd">
              <strong class="weui-dialog__title">弹窗标题</strong>
            </div>
            <div class="weui-dialog__bd">弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内</div>
            <div class="weui-dialog__ft">
              <a
                href="javascript:;"
                class="weui-dialog__btn weui-dialog__btn_default"
                onClick={() => {
                  this.default = false;
                }}
              >
                辅助操作
              </a>
              <a
                href="javascript:;"
                class="weui-dialog__btn weui-dialog__btn_primary"
                onClick={() => {
                  this.default = false;
                }}
              >
                主操作
              </a>
            </div>
          </v-dialog>

          <v-dialog
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
            <div class="weui-dialog__hd">
              <strong class="weui-dialog__title">弹窗标题</strong>
            </div>
            <div class="weui-dialog__bd">弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内</div>
          </v-dialog>
        </div>
      </div>
    );
  }
}
