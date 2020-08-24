import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'weui-demo-slider',
})
export default class DemoSlider extends Vue {
  value1: number = 10;
  value2: number = 0;
  value3: number = 0;
  value4: number = 0;
  value5: number = 0;
  value6: number = 0;
  value7: number = 0;
  min: number = 10;
  max: number = 99;
  step: number = 1;

  handleChange() {
    this.min = Math.floor(Math.random() * 30);
    this.max = Math.floor(50 + Math.random() * 100);
    this.step = 1 + Math.floor(Math.random() * 10);
  }

  render() {
    return (
      <div class="weui-demo demo-slider">
        <h2>v-slider</h2>
        <h3>滑块</h3>
        <div class="content">
          <p>default:{this.value1}</p>
          <v-slider vModel={this.value1}></v-slider>
          <br />
          <p>disabled</p>
          <v-slider value={10} disabled></v-slider>
          <br />
          <p>showLabel</p>
          <v-slider vModel={this.value1} showLabel></v-slider>
          <br />
          <p>barWidth:4 barColor:#bf4040</p>
          <v-slider vModel={this.value1} barWidth={4} barColor="#bf4040" showLabel></v-slider>
          <br />
          <p>decimals:{this.value2}</p>
          <v-slider vModel={this.value2} decimals={2} max={10} showLabel></v-slider>
          <br />
          <p>step:5 value:{this.value3}</p>
          <v-slider vModel={this.value3} step={5} showLabel></v-slider>
          <br />
          <p>step:0.5 value:{this.value4}</p>
          <v-slider vModel={this.value4} step={0.5} max={10} showLabel></v-slider>
          <br />
          <p>min/max: {this.value5}</p>
          <v-slider vModel={this.value5} min={15} max={30} showLabel></v-slider>
          <br />
          <p>
            change min/max value:{this.value6} step:{this.step}
          </p>
          <v-slider vModel={this.value6} min={this.min} max={this.max} step={this.step} showLabel></v-slider>
          <br />
          <v-button type="primary" onClick={this.handleChange.bind(this)}>
            change min/max/step
          </v-button>
          <br />
          <p>onChangeComplete:{this.value7}</p>
          <v-slider
            value={this.value7}
            onChangeComplete={(val: number) => {
              this.value7 = val;
            }}
            onStart={(val: number) => {
              console.log('on start', val);
            }}
            onEnd={(val: number) => {
              console.log('on end', val);
            }}
          ></v-slider>
        </div>
      </div>
    );
  }
}
