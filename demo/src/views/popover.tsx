import { Vue, Component } from 'vue-property-decorator';
@Component({
  name: 'weui-demo-popover',
})
export default class DemoPopover extends Vue {
  render() {
    return (
      <div class="weui-demo demo-popover">
        <h2>v-popover</h2>
        <h3>浮动消息</h3>
        <div class="content align-center">
          <v-popover content="right">
            <v-button type="primary" slot="reference" mini>
              right
            </v-button>
          </v-popover>
          <v-popover placement="left" style="margin-top:20px">
            <p>left</p>
            <p>left</p>
            <p>left</p>
            <v-button type="primary" slot="reference" mini>
              left
            </v-button>
          </v-popover>
          <v-popover placement="top" style="margin-top:20px">
            <h3 style="color:red;">top</h3>
            <p>this is HTML</p>
            <v-button type="primary" slot="reference" mini>
              top
            </v-button>
          </v-popover>
          <v-popover placement="bottom" gutter={20} style="margin-top:20px">
            <h3 style="color:red;">bottom</h3>
            <p>this is HTML</p>
            <p> gutter 20px</p>
            <v-button type="primary" slot="reference" mini>
              bottom
            </v-button>
          </v-popover>

          <div style="position:fixed;bottom:100px;text-align:center;left:0;right:0;">
            <p>fixed element</p>
            <v-popover placement="right" style="margin: 20px;">
              <span>fixed</span>
              <v-button type="primary" slot="reference" mini>
                fixed
              </v-button>
            </v-popover>
          </div>

          <p style="padding-top:800px">
            <v-popover
              placement="top"
              style="margin: 20px;"
              onShow={() => {
                // console.log('popover shown')
              }}
              onHide={() => {
                // console.log('popover hidden')
              }}
            >
              <span>padding top 500px</span>
              <v-button type="primary" slot="reference" mini>
                botton
              </v-button>
            </v-popover>
          </p>
        </div>
      </div>
    );
  }
}
