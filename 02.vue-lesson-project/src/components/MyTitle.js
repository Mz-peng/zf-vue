export default {
  // 函数式组件，只有render方法不能写
  functional: true,
  methods: {
    say() {
      alert(1);
    },
  },
  /* 
    context 就是当前组件的上下文
    props slots
  */
  render(h, context) {
    console.log(h);
    console.log(context);

    let t = "h" + context.props.type;
    console.log(context);
    return <t on-click={() => context.props.fn()}>{context.slots().default}</t>;
  },
};
