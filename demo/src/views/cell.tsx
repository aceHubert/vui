import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'weui-demo-cell',
})
export default class DemoCell extends Vue {
  render() {
    return (
      <div class="weui-demo demo-cell">
        <v-group title="title color red" titleColor="red">
          <v-cell label="default"></v-cell>
          <v-cell label="default" value="Value"></v-cell>
          <v-cell label="default slot value">Value</v-cell>
          <v-cell label="this is a link" isLink>
            Value
          </v-cell>
          <v-cell label="link to baidu" link="http://www.baidu.com"></v-cell>
          <v-cell label="link to $route" link={{ name: 'demo-weui-index' }}></v-cell>
          <v-cell label="icon default" icon="weui-icon-success"></v-cell>
          <v-cell label="this is a title" inlineDesc="this is a inline description">
            Value
          </v-cell>
          <v-cell>
            <img
              slot="icon"
              src="data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="
              alt=""
              style="margin-right: 10px"
            ></img>
            <span slot="label" style="color:green;">
              slots title
            </span>
            <span slot="inline-desc" style="color:red">
              slot innerdescription
            </span>
            Value
          </v-cell>
          <v-cell label="loading" isLoading></v-cell>
          <v-cell label="primary" primary="content">
            <div style="text-align:center">content center</div>
          </v-cell>
          <v-cell label="borderIntent" borderIntent={false}>
            top line
          </v-cell>
          <v-cell label="Arrow" isLink arrowDirection="up">
            up
          </v-cell>
          <v-cell label="Arrow" isLink arrowDirection="down">
            down
          </v-cell>
          <v-cell label="disabled" isLink disabled>
            true
          </v-cell>
        </v-group>

        <v-group>
          <v-group-title color="red">v-group Title</v-group-title>
          <v-cell label="语言" isLink>
            中文
          </v-cell>
        </v-group>

        <v-group title="alignItems" labelWidth="5em">
          <v-cell label="default">
            long long long long long long long long long long long long long long long long
          </v-cell>
          <v-cell label="flex-start" alignItems="flex-start">
            long long long long long long long long long long long long long long long long
          </v-cell>
        </v-group>

        <v-group title="lableAlign:justify" labelAlign="justify" labelWidth="100px" labelMarginRight="10px">
          <v-cell label="lable align" valueAlign="left">
            left
          </v-cell>
          <v-cell label="语言" valueAlign="left" isLink>
            中文
          </v-cell>
        </v-group>

        <v-group
          title="labelAlign:right & valueAlign:left"
          labelAlign="right"
          labelWidth="100px"
          labelMarginRight="10px"
        >
          <v-cell label="value align:" valueAlign="left">
            left
          </v-cell>
          <v-cell label="语言:" valueAlign="left" isLink>
            中文
          </v-cell>
        </v-group>

        <v-group gutter={5}>
          <v-cell label="margin top" isLink>
            5px
          </v-cell>
        </v-group>

        <v-group title="v-cellbox">
          <v-cell-box>long long long long long long long long long long long long long long long</v-cell-box>
          <v-cell-box>short short short short</v-cell-box>
          <v-cell-box isLink>
            <div class="weui-cell__bd">isLink</div>
            <div class="weui-cell__ft">Value</div>
          </v-cell-box>
          <v-cell-box link="http://www.baidu.com">www.baidu.com</v-cell-box>
        </v-group>
      </div>
    );
  }
}
