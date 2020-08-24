import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'weui-demo-flexbox',
})
export default class DemoFlexbox extends Vue {
  get flexStyle() {
    return {
      color: '#fff',
      backgroundColor: '#20b907',
      textAlign: 'center',
      borderRadius: '4px',
      backgroundClip: 'padding-box',
    };
  }

  render() {
    return (
      <div class="weui-demo demo-flexbox" style="padding:10px 16px">
        <v-flexbox>
          <v-flexbox-item>
            <div style={this.flexStyle}>1</div>
          </v-flexbox-item>
          <v-flexbox-item>
            <div style={this.flexStyle}>1</div>
          </v-flexbox-item>
        </v-flexbox>
        <br />
        <v-flexbox gutter={0}>
          <v-flexbox-item>
            <div style={this.flexStyle}>1</div>
          </v-flexbox-item>
          <v-flexbox-item>
            <div style={this.flexStyle}>2</div>
          </v-flexbox-item>
          <v-flexbox-item>
            <div style={this.flexStyle}>3</div>
          </v-flexbox-item>
          <v-flexbox-item>
            <div style={this.flexStyle}>4</div>
          </v-flexbox-item>
        </v-flexbox>
        <br />
        <v-flexbox>
          <v-flexbox-item>
            <div style={this.flexStyle}>1</div>
          </v-flexbox-item>
          <v-flexbox-item>
            <div style={this.flexStyle}>2</div>
          </v-flexbox-item>
          <v-flexbox-item>
            <div style={this.flexStyle}>3</div>
          </v-flexbox-item>
          <v-flexbox-item>
            <div style={this.flexStyle}>4</div>
          </v-flexbox-item>
          <v-flexbox-item>
            <div style={this.flexStyle}>5</div>
          </v-flexbox-item>
          <v-flexbox-item>
            <div style={this.flexStyle}>6</div>
          </v-flexbox-item>
        </v-flexbox>
        <br />
        <v-flexbox>
          <v-flexbox-item>
            <div style={this.flexStyle}>span 1</div>
          </v-flexbox-item>
          <v-flexbox-item span={2}>
            <div style={this.flexStyle}>span 2</div>
          </v-flexbox-item>
          <v-flexbox-item>
            <div style={this.flexStyle}>span 1</div>
          </v-flexbox-item>
        </v-flexbox>
        <br />
        <v-flexbox>
          <v-flexbox-item>
            <div style={this.flexStyle}>1/3</div>
          </v-flexbox-item>
          <v-flexbox-item span={2 / 3}>
            <div style={this.flexStyle}>2/3</div>
          </v-flexbox-item>
        </v-flexbox>
        <br />
        <v-flexbox>
          <v-flexbox-item span={1 / 3}>
            <div style={this.flexStyle}>1/3</div>
          </v-flexbox-item>
          <v-flexbox-item span={1 / 6}>
            <div style={this.flexStyle}>1/6</div>
          </v-flexbox-item>
          <v-flexbox-item span={1 / 8}>
            <div style={this.flexStyle}>1/8</div>
          </v-flexbox-item>
          <v-flexbox-item span={1 / 8}>
            <div style={this.flexStyle}>1/8</div>
          </v-flexbox-item>
          <v-flexbox-item>
            <div style={this.flexStyle}>rest</div>
          </v-flexbox-item>
        </v-flexbox>
        <br />
        <v-flexbox>
          <v-flexbox-item span={6 / 12}>
            <div style={this.flexStyle}>6/12</div>
          </v-flexbox-item>
          <v-flexbox-item span={2 / 12}>
            <div style={this.flexStyle}>2/12</div>
          </v-flexbox-item>
          <v-flexbox-item>
            <div style={this.flexStyle}>rest</div>
          </v-flexbox-item>
        </v-flexbox>

        <br />
        <v-flexbox>
          <v-flexbox-item order={4}>
            <div style={this.flexStyle}>1</div>
          </v-flexbox-item>
          <v-flexbox-item order={3}>
            <div style={this.flexStyle}>2</div>
          </v-flexbox-item>
          <v-flexbox-item order={2}>
            <div style={this.flexStyle}>3</div>
          </v-flexbox-item>
          <v-flexbox-item order={1}>
            <div style={this.flexStyle}>4</div>
          </v-flexbox-item>
          <v-flexbox-item order={-99}>
            <div style={this.flexStyle}>5</div>
          </v-flexbox-item>
        </v-flexbox>
        <br />
        <v-flexbox>
          <v-flexbox-item>
            <div style={this.flexStyle}>1</div>
          </v-flexbox-item>
          <v-flexbox-item none>
            <div style={{ ...this.flexStyle, width: '100px' }}>auto 100px</div>
          </v-flexbox-item>
        </v-flexbox>
      </div>
    );
  }
}
