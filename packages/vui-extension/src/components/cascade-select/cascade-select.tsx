import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import ActionSheet from '../actionsheet';
import LoadMore from '../loadmore';
import './styles/index';

export type CascadeSelectTree = {
  key: string | number;
  label: string;
  children?: CascadeSelectTree[] | ((parendKey: string | number) => CascadeSelectTree[] | Promise<CascadeSelectTree[]>);
};

@Component({
  name: 'vui-cascade-select',
})
export default class CascadeSelect extends Vue {
  @Prop({ type: [Array, Function], required: true, default: () => [] })
  dataSources!: CascadeSelectTree[] | (() => Promise<CascadeSelectTree[]> | CascadeSelectTree[]);
  @Prop({ type: Array, default: () => [] }) value!: Array<string | number>;
  @Prop(String) header?: string; // 支持 html，actionsheet|step 下生效
  @Prop({ type: Boolean, default: false }) show!: boolean; // support snyc，actionsheet 下生效
  @Prop({ type: Number, default: 1 }) minShownLevel!: number; // 最少显示级别, select 下生效
  @Prop({ type: String, default: 'actionsheet', validator: (val) => ['actionsheet', 'step', 'select'].includes(val) })
  theme!: 'actionsheet' | 'step' | 'select';

  currentLabels: Array<string> = [];
  currentOptions: CascadeSelectTree[][] = [];
  loading: boolean = false;
  // from data function
  currentSelected!: Array<string | number>;
  currentIndex!: number;
  actionSheetShow!: boolean;
  __dataSources?: CascadeSelectTree[]; // save function dataSourves resolve

  data() {
    return {
      currentSelected: [...this.value],
      currentIndex: this.value.length,
      actionSheetShow: this.show,
    };
  }

  // 包含当前选择的下一级
  async getOptions() {
    let tempDataSources: CascadeSelectTree[] = [];
    const sources = this.__dataSources || this.dataSources;
    if (Array.isArray(sources)) {
      tempDataSources = sources;
    } else if (typeof sources === 'function') {
      const resolve = sources();
      if (!Array.isArray(resolve)) {
        // Promise
        this.loading = true;
        tempDataSources = await resolve;
        this.loading = false;
      } else {
        tempDataSources = resolve;
      }
      this.__dataSources = tempDataSources;
    }

    if (!tempDataSources.length) return [];

    const options: Array<CascadeSelectTree[]> = [tempDataSources.map(({ key, label }) => ({ key, label }))];

    for (let i = 0; i < this.currentSelected.length; i++) {
      const value = this.currentSelected[i];
      // 通过当前级别选中值计算下一级别 options
      const node = tempDataSources.find(({ key }) => key === value);
      if (!node) break;
      // 设置下一级
      if (Array.isArray(node.children)) {
        tempDataSources = node.children;
      } else if (typeof node.children === 'function') {
        const resolve = node.children(node.key);
        if (!Array.isArray(resolve)) {
          // Promise
          this.loading = true;
          tempDataSources = await resolve;
          this.loading = false;
        } else {
          tempDataSources = resolve;
        }
        node.children = tempDataSources;
      } else {
        break;
      }
      tempDataSources.length && options.push(tempDataSources.map(({ key, label }) => ({ key, label })));
    }
    // set lables
    (() => {
      if (!this.currentSelected.length) return;
      this.currentLabels = this.currentSelected.map((id, index) => {
        const nodes = options[index];
        if (nodes) {
          const node = nodes.find((n) => n.key === id);
          return node ? node.label : '';
        }
        return '';
      });
    })();
    // set options
    this.currentOptions = options;

    return options;
  }

  @Watch('value')
  watchValue(val: Array<string | number>) {
    if (this.currentSelected.concat(val).filter((v) => !this.currentSelected.includes(v) || !val.includes(v)).length) {
      this.currentSelected = [...val];
      // 假设下一个选项还可以选择
      this.currentIndex = this.currentSelected.length;
      // 值主动被修改时
      this.getOptions();
    }
  }

  @Watch('currentSelected')
  watchCurrentSelected(val: Array<number>) {
    const pure = JSON.parse(JSON.stringify(val));
    this.$emit('input', pure);
  }

  @Watch('show')
  watchShow(val: boolean) {
    if (this.actionSheetShow !== val) {
      this.actionSheetShow = val;
    }
  }

  @Watch('actionSheetShow')
  watchActionsheetShow(val: boolean) {
    this.$emit('update:show', val);
  }

  handleSelectChange(value: string | number, index: number) {
    this.currentSelected.splice(index, this.currentSelected.length - index, value);

    this.getOptions().then((options) => {
      const pure = JSON.parse(JSON.stringify(this.currentSelected));
      this.$emit('change', pure, this.currentLabels);
      if (this.currentSelected.length < options.length) {
        // 还有下一级可选
        this.currentIndex = index + 1;
      } else {
        // completeChange
        if (this.theme === 'actionsheet') {
          this.actionSheetShow = false;
        }
        this.$emit('completeChange', pure, this.currentLabels);
      }
    });
  }

  created() {
    this.getOptions();
  }

  renderDefault() {
    const renderChild = (
      options: Array<{ key: string | number; label: string }> = [],
      value: string | number | null = null,
      attrs: any = {},
    ) => {
      return (
        <select {...attrs} class="select__item" value={value} data-value={value}>
          <option value={null}>请选择</option>
          {options.map((node) => (
            <option value={node.key}>{node.label}</option>
          ))}
        </select>
      );
    };

    let _multiOptions = this.currentOptions;
    // 最少显示minShownLevel级
    _multiOptions.length < this.minShownLevel &&
      (_multiOptions = _multiOptions.concat(Array.from({ length: this.minShownLevel - _multiOptions.length })));

    return (
      <div class="selects">
        {_multiOptions.map((options, index) =>
          renderChild(options, this.currentSelected[index], {
            on: {
              change: (e: any) => {
                e.stopPropagation();
                this.handleSelectChange(
                  options && options.length && typeof options[0].key === 'number'
                    ? parseInt(e.target.value)
                    : e.target.value,
                  index,
                );
              },
            },
          }),
        )}
      </div>
    );
  }

  renderStep() {
    // 选择项 index 大于可选项时，取最后一项
    const currentIndex =
      this.currentIndex > this.currentOptions.length - 1 ? this.currentOptions.length - 1 : this.currentIndex;
    const currentOptions = this.currentOptions.length ? this.currentOptions[currentIndex] : [];

    return (
      <div class="step">
        <div class="step__hd">
          {this.$scopedSlots.header ? this.$scopedSlots.header({}) : this.header}
          <ul class="labels">
            {this.currentLabels.map((label, index) => (
              <li
                class={['label__item', { 'label__item--active': currentIndex === index }]}
                onClick={() => {
                  this.currentIndex = index;
                }}
              >
                {label}
              </li>
            ))}
            {this.currentSelected.length < this.currentOptions.length ? (
              <li
                class={['label__item', { 'label__item--active': currentIndex === this.currentLabels.length }]}
                onClick={() => {
                  this.currentIndex = this.currentLabels.length;
                }}
              >
                请选择
              </li>
            ) : null}
          </ul>
        </div>
        <div class="step__bd">
          {this.loading ? (
            <LoadMore />
          ) : (
            <ul class="labels">
              {currentOptions.map(({ key, label }) => (
                <li
                  class={['label__item']}
                  onClick={(e: Event) => {
                    e.stopPropagation();
                    this.handleSelectChange(key, currentIndex);
                  }}
                >
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  renderActionSheet() {
    // 选择项 index 大于可选项时，取最后一项
    const currentIndex =
      this.currentIndex > this.currentOptions.length - 1 ? this.currentOptions.length - 1 : this.currentIndex;
    const currentOptions = this.currentOptions.length ? this.currentOptions[currentIndex] : [];

    return (
      <ActionSheet
        v-model={this.actionSheetShow}
        class="actionsheet"
        menus={currentOptions}
        closeOnClickMenu={false}
        closeOnClickMask={false}
        onMenuClick={(key: string | number) => this.handleSelectChange(key, currentIndex)}
      >
        <template slot="header">
          {this.$scopedSlots.header ? this.$scopedSlots.header({}) : this.header}
          <ul class="actionsheet__labels">
            {this.currentLabels.map((label, index) => (
              <li
                class={['actionsheet-label__item', { 'actionsheet-label__item--active': currentIndex === index }]}
                onClick={() => {
                  this.currentIndex = index;
                }}
              >
                {label}
              </li>
            ))}
            {this.currentSelected.length < this.currentOptions.length ? (
              <li
                class={[
                  'actionsheet-label__item',
                  { 'actionsheet-label__item--active': currentIndex === this.currentLabels.length },
                ]}
                onClick={() => {
                  this.currentIndex = this.currentLabels.length;
                }}
              >
                请选择
              </li>
            ) : null}
            <a
              href="javascript:;"
              class="actionsheet__close"
              onClick={(e: Event) => {
                e.stopPropagation();
                this.actionSheetShow = false;
              }}
            >
              <i class="weui-icon-close"></i>
            </a>
          </ul>
        </template>
      </ActionSheet>
    );
  }

  render() {
    return (
      <div class="vui-cascade-select">
        {this.theme === 'step'
          ? this.renderStep(h)
          : this.theme === 'actionsheet'
          ? this.renderActionSheet(h)
          : this.renderDefault(h)}
      </div>
    );
  }
}
