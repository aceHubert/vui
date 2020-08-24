import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export class ParentMixin extends Vue {
  @Prop(Number) value!: number;

  currentIndex: number = -1;
  // from data function
  number!: number;

  data() {
    return {
      number: this.$children.length,
    };
  }

  // tips: watchCurrentIndex方法名不响应，可能与Vue 方法名冲突
  @Watch('currentIndex')
  watchCurrentIndex1(val: number, oldVal: number) {
    oldVal > -1 && this.$children[oldVal] && ((this.$children[oldVal] as ChildMixin).currentSelected = false);
    val > -1 && this.$children[val] && ((this.$children[val] as ChildMixin).currentSelected = true);
    this.$emit('input', val);
    this.$emit('indexChange', val, oldVal);
  }

  @Watch('value')
  watchValue(val: number) {
    this.currentIndex = val;
  }

  updateIndex() {
    if (!this.$children || !this.$children.length) return;
    this.number = this.$children.length;
    const children = this.$children;
    for (let i = 0; i < children.length; i++) {
      (children[i] as ChildMixin).currentIndex = i;
      if ((children[i] as ChildMixin).currentSelected) {
        this.currentIndex = i;
      }
    }
  }

  mounted() {
    if (this.value >= 0) {
      this.currentIndex = this.value;
    }
    this.updateIndex();
  }
}

@Component
export class ChildMixin extends Vue {
  @Prop({ type: Boolean, default: false }) selected!: boolean;

  currentIndex = -1;
  // from data function
  currentSelected!: boolean;

  data() {
    return {
      currentSelected: this.selected,
    };
  }

  @Watch('currentSelected')
  watchCurrentSelected(val: boolean) {
    val && ((this.$parent as ParentMixin).currentIndex = this.currentIndex);
  }

  @Watch('selected')
  watchSelected(val: boolean) {
    this.currentSelected = val;
  }

  onItemClick(this: any, e: Event) {
    e.preventDefault();
    e.stopPropagation();

    if (this.$parent.preventDefault) {
      this.$parent.$emit('beforeIndexChange', this.currentIndex);
      return;
    }
    if (this.disabled !== true) {
      this.currentSelected = true;
      // this.$parent.currentIndex = this.currentIndex
      this.$nextTick(() => {
        this.$emit('itemClick', this.currentIndex);
      });
    }
  }

  mounted() {
    (this.$parent as ParentMixin).updateIndex();
  }

  beforeDestroy() {
    const $parent = this.$parent;
    this.$nextTick(() => {
      ($parent as ParentMixin).updateIndex();
    });
  }
}
