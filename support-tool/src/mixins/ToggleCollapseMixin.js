export const ToggleCollapseMixin = {
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    toggleCollapse() {
      console.log("HEllooo");
      this.collapsed = !this.collapsed;
    }
  }
};

