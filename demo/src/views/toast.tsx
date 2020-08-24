import { Vue, Component } from 'vue-property-decorator';
import { ToastPlugin, ToastModule } from '@vui/core';

Vue.use(ToastPlugin, { zIndex: 2003 });

@Component({
  name: 'weui-demo-toast',
})
export default class DemoToast extends Vue {
  show1: boolean = false;
  show2: boolean = false;
  show3: boolean = false;
  show4: boolean = false;
  show5: boolean = false;
  show6: boolean = false;
  show7: boolean = false;

  showDefault() {
    ToastModule.show({
      text: 'Success',
      timeout: 5000,
    });
  }

  showText() {
    ToastModule.text('This is the text');
  }

  showTop() {
    ToastModule.text('This is the text', 'top');
  }

  showBottom() {
    ToastModule.text('This is the text', 'bottom');
  }

  render() {
    return (
      <div class="weui-demo demo-toast">
        <v-group>
          <v-cell-switch label="default" vModel={this.show1}></v-cell-switch>
          <v-cell-switch label="type: text" vModel={this.show2}></v-cell-switch>
          <v-cell-switch label="type: cancel" vModel={this.show3}></v-cell-switch>
          <v-cell-switch label="type: warn" vModel={this.show4}></v-cell-switch>
        </v-group>

        <v-group>
          <v-cell-switch label="on top" vModel={this.show5}></v-cell-switch>
          <v-cell-switch label="on middle" vModel={this.show6}></v-cell-switch>
          <v-cell-switch label="on buttom" vModel={this.show7}></v-cell-switch>
        </v-group>

        <v-toast vModel={this.show1} text="Success"></v-toast>
        <v-toast vModel={this.show2} text="Text" type="text"></v-toast>
        <v-toast vModel={this.show3} text="Cancel" type="cancel"></v-toast>
        <v-toast vModel={this.show4} text="Warn" type="warn"></v-toast>

        <v-toast vModel={this.show5} text="top" type="text" position="top"></v-toast>
        <v-toast vModel={this.show6} text="middle" type="text" position="middle"></v-toast>
        <v-toast vModel={this.show7} text="bottom" type="text" position="bottom"></v-toast>

        <div style="padding: 10px 16px;">
          <v-button type="primary" onClick={this.showDefault.bind(this)}>
            Default
          </v-button>
          <v-button type="primary" onClick={this.showText.bind(this)}>
            Text
          </v-button>
          <v-button type="primary" onClick={this.showTop.bind(this)}>
            Top
          </v-button>
          <v-button type="primary" onClick={this.showBottom.bind(this)}>
            Bottom
          </v-button>
        </div>
      </div>
    );
  }
}
