import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'weui-demo-switch',
})
export default class DemoSwitch extends Vue {
  value: boolean = false;

  render() {
    return (
      <div class="weui-demo demo-switch">
        <div style="padding: 10px 16px; text-align: center;">
          default:<v-switch vModel={this.value}></v-switch>
          <br />
          mini:<v-switch vModel={this.value} mini></v-switch>
          <br />
          disabled:<v-switch disabled></v-switch>
          <v-switch checked={true} disabled></v-switch>
        </div>
        <v-group title="cell-switch">
          <v-cell-switch vModel={this.value} label="default"></v-cell-switch>
          <v-cell-switch vModel={this.value} label="title" inlineDesc="inline description"></v-cell-switch>
          <v-cell-switch vModel={this.value} label="icon" icon="weui-icon-success"></v-cell-switch>
          <v-cell-switch label="disabled: false" disabled></v-cell-switch>
          <v-cell-switch checked={true} label="disabled: true" disabled></v-cell-switch>
          <v-cell-switch vModel={this.value} label="mini" mini></v-cell-switch>
          <v-cell-switch vModel={this.value} label="long long long long long long long long "></v-cell-switch>
          <v-cell-switch vModel={this.value}>
            <img
              slot="icon"
              src="data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="
              alt=""
              style="margin-right: 10px"
            ></img>
            <span slot="label" style="color:red;">
              this is slot label
            </span>
            <strong slot="inline-desc" style="color:green;">
              this is slot inline-desc
            </strong>
          </v-cell-switch>
        </v-group>

        <v-group labelAlign="justify" labelWidth="10em">
          <v-cell-switch vModel={this.value} label="labelAlign justify"></v-cell-switch>
        </v-group>
      </div>
    );
  }
}
