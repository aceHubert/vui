import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'weui-demo-searchbar',
})
export default class DemoSearchBar extends Vue {
  isFocus: boolean = false;
  searchText: string = '';
  results: Array<{ val: string; title: string; other: number }> = [];

  handleChange(val: string) {
    if (val.length) {
      this.results = Array.from({ length: 20 }, (_, key) => ({ val: val, title: `Result: ${key}`, other: key }));
    } else {
      this.results = [];
    }
  }

  render() {
    return (
      <div class="weui-demo demo-searchbar">
        <v-search-bar
          ref="search"
          placeholder="Search"
          cancelText="Cancel"
          vModel={this.searchText}
          onResultClick={(item: any) => {
            console.log(JSON.stringify(item));
          }}
          onChange={(val: string) => this.handleChange(val)}
          onSubmit={(value: string) => {
            console.log('submit', value);
          }}
          onFocus={() => {
            this.isFocus = true;
          }}
          onBlur={() => {
            this.isFocus = false;
          }}
          onCancel={() => {
            console.log('cancel');
          }}
          onClear={() => {
            console.log('claer');
          }}
          results={this.results}
          {...{
            scopedSlots: {
              default: (item: any) => `${item.val} ${item.title} other:${item.other}`,
            },
          }}
        ></v-search-bar>
        <div style="margin:10px">
          <v-button
            type="primary"
            onClick={() => {
              (this.$refs.search as any).setFocus();
            }}
          >
            Set focus
          </v-button>
        </div>
        <v-search-bar
          placeholder="Search"
          cancelText="Cancel"
          autoFixed={false}
          vModel={this.searchText}
          results={this.results}
        ></v-search-bar>
      </div>
    );
  }
}
