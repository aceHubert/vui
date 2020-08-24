import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'weui-demo-navbar',
})
export default class DemoNavbar extends Vue {
  active: number = 1;
  active1: number = 0;

  getBarWidth(index: number) {
    return (index + 1) * 20 + 'px';
  }

  // preventDefault
  handleBeforeIndexChange(index: number) {
    setTimeout(() => {
      this.active1 = index;
    }, 1000);
  }

  render() {
    return (
      <div class="weui-demo demo-navbar">
        <v-navbar>
          <v-navbar-item selected>Item1</v-navbar-item>
          <v-navbar-item>Item2</v-navbar-item>
          <v-navbar-item>Item3</v-navbar-item>
        </v-navbar>
        <p>v-model:</p>
        <v-navbar vModel={this.active} noAnimate>
          <v-navbar-item>Item1</v-navbar-item>
          <v-navbar-item>Item2</v-navbar-item>
          <v-navbar-item>Item3</v-navbar-item>
        </v-navbar>
        <p>Top:</p>
        <v-navbar barPosition="top">
          <v-navbar-item selected>Item1</v-navbar-item>
          <v-navbar-item>Item2</v-navbar-item>
          <v-navbar-item>Item3</v-navbar-item>
        </v-navbar>
        <p>Disabled:</p>
        <v-navbar>
          <v-navbar-item selected>Item1</v-navbar-item>
          <v-navbar-item>Item2</v-navbar-item>
          <v-navbar-item disabled>Item3</v-navbar-item>
        </v-navbar>
        <p>Colors:</p>
        <v-navbar defaultColor="red" barActiveColor="pink" activeColor="green" disabledColor="yellow" lineWidth={1}>
          <v-navbar-item selected>Item1</v-navbar-item>
          <v-navbar-item>Item2</v-navbar-item>
          <v-navbar-item disabled>Item3</v-navbar-item>
        </v-navbar>
        <p>preventDefault:</p>
        <v-navbar vModel={this.active1} preventDefault onBeforeIndexChange={this.handleBeforeIndexChange.bind(this)}>
          <v-navbar-item>Item1</v-navbar-item>
          <v-navbar-item>Item2</v-navbar-item>
          <v-navbar-item>Item3</v-navbar-item>
        </v-navbar>
        <p>Scrollable</p>
        <v-navbar>
          <v-navbar-item>Item1</v-navbar-item>
          <v-navbar-item>Item2</v-navbar-item>
          <v-navbar-item selected>Item3</v-navbar-item>
          <v-navbar-item>Item4</v-navbar-item>
          <v-navbar-item>Item5</v-navbar-item>
          <v-navbar-item>Item6</v-navbar-item>
        </v-navbar>
        <p>No animation</p>
        <v-navbar noAnimate>
          <v-navbar-item>Item1</v-navbar-item>
          <v-navbar-item selected>Item2</v-navbar-item>
          <v-navbar-item>Item3</v-navbar-item>
        </v-navbar>
        <p>custom bar width</p>
        <v-navbar customBarWidth="30px">
          <v-navbar-item>Item1</v-navbar-item>
          <v-navbar-item selected>Item2</v-navbar-item>
          <v-navbar-item>Item3</v-navbar-item>
        </v-navbar>
        <p>custom bar width function</p>
        <v-navbar customBarWidth={this.getBarWidth.bind(this)}>
          <v-navbar-item>AB</v-navbar-item>
          <v-navbar-item selected>ABCD</v-navbar-item>
          <v-navbar-item>ABCDEF</v-navbar-item>
        </v-navbar>
      </div>
    );
  }
}
