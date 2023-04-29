script
<template>
  <div>
    <Table :columns="c" :data="data"></Table>
  </div>
</template>

<script>
/* 扩展 iview Table 组件 */
export default {
  props: ["columns", "data"],
  data() {
    return {
      c: [],
      index: -1,
    };
  },
  mounted() {
    console.log("my-table >>> columns : ", this.columns);
    this.c = this.columns.map((cloumn) => {
      if (cloumn.edit) {
        cloumn.render = (h, { column, row, index }) => {
          console.log("cloumn.render >>> 参数: ", column, row, index);
          return (
            <div>
              {index === this.index ? (
                <div>
                  <i-input
                    type="text"
                    style="width: 100px; margin-right: 20px"
                    value={row[column.key]}
                    on-input={(e) => this.change(e, column, row, index)}
                  />
                  <i-button on-click={() => this.save()}>保存</i-button>
                </div>
              ) : (
                <div>
                  {row[column.key]}
                  <i-button
                    style="margin-left: 20px"
                    on-click={() => this.edit(index)}
                  >
                    编辑
                  </i-button>
                </div>
              )}
            </div>
          );
        };
      }
      return cloumn;
    });
  },
  methods: {
    edit(i) {
      this.index = i;
    },
    save() {
      this.index = -1;
    },
    change(val, column, row, index) {
      // 将输入框中的值拿到，直接覆盖掉
      console.log("my-table change() >>> ", val);
      row[column.key] = val;
    },
  },
};
</script>

<style lang="scss" scoped></style>
