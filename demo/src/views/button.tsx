import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'weui-demo-button',
})
export default class DemoButton extends Vue {
  render() {
    return (
      <div class="weui-demo demo-button" style="padding:10px;">
        <v-button
          type="primary"
          onClick={() => {
            // console.log('click')
          }}
        >
          Primary
        </v-button>
        <v-button type="primary" loading>
          Primary Loading
        </v-button>
        <v-button type="primary" disabled>
          Primary Disabled
        </v-button>
        <v-button>Default</v-button>
        <v-button loading>Default Loading</v-button>
        <v-button disabled>Default Disabled</v-button>
        <v-button type="warn">Wran</v-button>
        <v-button type="warn" loading>
          Warn Loading
        </v-button>
        <v-button type="warn" disabled>
          Warn Disabled
        </v-button>
        <v-button type="text">Text</v-button>
        <v-button type="text" disabled>
          Text Disabled
        </v-button>
        <v-button type="link">Link</v-button>
        <v-button type="link" disabled>
          Link Disabled
        </v-button>
        <v-button type="primary" round>
          Round
        </v-button>
        <v-button type="primary" round disabled>
          Round Disabled
        </v-button>
        <v-button type="warn" round>
          Round Warn
        </v-button>
        <v-button type="default" round>
          Round Default
        </v-button>
        <v-button type="primary" plain>
          Plain
        </v-button>
        <v-button type="primary" round plain>
          Plain/Round
        </v-button>
        <v-button type="warn" round plain>
          Plain Warn
        </v-button>
        <v-button round plain>
          Plain Default
        </v-button>
        <v-button type="primary" round plain disabled>
          Primary Disabled
        </v-button>
        <v-button type="warn" round plain disabled>
          Warn Disabled
        </v-button>
        <v-button round plain disabled>
          Default Disabled
        </v-button>

        <div style="margin-top:20px">
          <p>mini</p>
          <v-button type="primary" mini>
            Mini
          </v-button>
          <v-button type="warn" mini>
            Mini
          </v-button>
          <v-button mini>Mini</v-button>
          <v-button type="primary" mini round>
            Mini
          </v-button>
          <v-button type="warn" mini plain>
            Mini
          </v-button>
          <v-button mini plain round>
            Mini
          </v-button>
        </div>
        <div style="margin-top:20px">
          <p>inline</p>
          <v-button type="primary" inline>
            Inline
          </v-button>
          <v-button type="warn" inline>
            Inline
          </v-button>
          <v-button inline>Inline</v-button>
        </div>
        <div style="margin-top:20px">
          <p>circle</p>
          <v-button type="primary" icon="weui-icon-search" circle>
            Circle
          </v-button>
          <v-button type="warn" icon="weui-icon-search" circle>
            Circle
          </v-button>
          <v-button icon="weui-icon-search" circle>
            Circle
          </v-button>
          <v-button icon="weui-icon-search" circle loading>
            Circle
          </v-button>
          <v-button icon="weui-icon-search" circle plain>
            Circle
          </v-button>
        </div>
        <div style="margin-top:20px">
          <p>mini circle</p>
          <v-button type="primary" icon="weui-icon-search" circle mini>
            Circle
          </v-button>
          <v-button type="warn" icon="weui-icon-search" circle mini>
            Circle
          </v-button>
          <v-button icon="weui-icon-search" circle mini>
            Circle
          </v-button>
          <v-button icon="weui-icon-search" circle mini loading>
            Circle
          </v-button>
          <v-button icon="weui-icon-search" circle mini plain>
            Circle
          </v-button>
        </div>
      </div>
    );
  }
}
