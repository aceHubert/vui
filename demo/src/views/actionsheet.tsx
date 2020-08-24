import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'weui-demo-actionsheet',
})
export default class DemoActionsheet extends Vue {
  base: boolean = false;
  android: boolean = false;
  withCancel: boolean = false;
  slotHeader: boolean = false;

  menus = {
    '1': 'item1',
    '2': { label: 'item2', type: 'info' },
    '3': { label: 'item3', type: 'primary' },
    '4': { label: 'item4', type: 'warn' },
    '5': { label: 'item5', type: 'disabled' },
  };

  menus2 = [
    { key: '1', label: 'item1' },
    { key: '2', label: 'item2', type: 'info' },
    { key: '3', label: 'item3', type: 'primary' },
    { key: '4', label: 'item4', type: 'warn' },
    { key: '5', label: 'item5', type: 'disabled' },
  ];

  render() {
    return (
      <div class="weui-demo demo-actionsheet">
        <v-group>
          <v-cell-switch label="default" vModel={this.base}></v-cell-switch>
          <v-cell-switch label="android" vModel={this.android}></v-cell-switch>
          <v-cell-switch label="withCancel" vModel={this.withCancel}></v-cell-switch>
          <v-cell-switch label="slotHeader" vModel={this.slotHeader}></v-cell-switch>
        </v-group>
        <v-actionsheet vModel={this.base} menus={this.menus}></v-actionsheet>
        <v-actionsheet
          vModel={this.android}
          theme="android"
          menus={this.menus2}
          onAfterShow={() => {
            // console.log('showed')
          }}
        ></v-actionsheet>
        <v-actionsheet vModel={this.slotHeader} showCancel menus={this.menus}>
          <span slot="header" style="color:red;font-size:14px;">
            this is a customed header
          </span>
        </v-actionsheet>
        <v-actionsheet
          vModel={this.withCancel}
          header="this is header, long long long long long long long long long long long"
          showCancel
          menus={this.menus}
        ></v-actionsheet>
      </div>
    );
  }
}
