import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'weui-demo-checker',
})
export default class DemoChecker extends Vue {
  value1 = ['a', '2'];
  value2 = [];
  checked = true;

  options = [
    {
      value: 'Test A',
      key: 'a',
    },
    {
      value: 'Test B',
      key: '2',
    },
    {
      value: 'Test C',
      key: 'c',
      inlineDesc: 'Description C',
    },
  ];

  disabledOptions = [
    {
      value: 'Test A',
      key: 'a',
    },
    {
      value: 'Test B',
      key: '2',
    },
    {
      value: 'Disabled',
      key: 'c',
      disabled: true,
    },
  ];

  render() {
    return (
      <div class="weui-demo demo-checker">
        <h2>Checkbox</h2>
        <h3>多选框</h3>
        <div class="content no-padding">
          <v-check-list title="label left" labelPosition="left" options={this.options} vModel={this.value1} />

          <v-check-list
            title="label right"
            options={this.options}
            value={this.value1}
            {...{
              scopedSlots: {
                footer: (option: any) => <span> {option.key}</span>,
              },
            }}
          ></v-check-list>

          <v-check-list title="disabled item" options={this.disabledOptions} vModel={this.value2} />

          <br />
          <p style="padding:0 16px;">check icon</p>
          <div style="padding:10px;16px;background-color:#fff;">
            <v-check-icon>Default</v-check-icon>
            <v-check-icon vModel={this.checked}>Checked</v-check-icon>
            <v-check-icon disabled>Disabled</v-check-icon>
          </div>

          <v-group title="check icon in cell">
            <v-cell>
              <v-check-icon slot="label">This is Checkicon</v-check-icon>
            </v-cell>
          </v-group>
        </div>
      </div>
    );
  }
}
