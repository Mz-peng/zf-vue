<template>
  <div v-click-outside>
    <input type="text" :value="formatDate" />
    <div class="pannel" v-if="isVisible">
      <div class="pannel-nav">
        <span @click="preYear">&lt;</span>
        <span @click="preMonth">&lt;&lt;</span>
        <span>{{ time.year }}年</span>
        <span>{{ time.month + 1 }}月</span>
        <span @click="nextMonth">&gt;&gt;</span>
        <span @click="nextYear">&gt;</span>
      </div>
      <div class="pannel-content">
        <div class="days">
          <span v-for="w in 7" class="cell" :key="`_` + w"> {{ weekdays[w - 1] }} </span>
          <!--直接列出一个 6 * 7 的列表 99 乘法表-->
          <div v-for="i in 6" :key="i">
            <!--判断是不是当月，不是当月就变灰色-->
            <span
              class="cell cell-days"
              :class="[
                { notCurrentMonth: !isCurrentMonth(vasibeDays[(i - 1) * 7 + (j - 1)]) },
                { today: isToday(vasibeDays[(i - 1) * 7 + (j - 1)]) },
                { select: isSelect(vasibeDays[(i - 1) * 7 + (j - 1)]) },
              ]"
              v-for="j in 7"
              :key="j"
              @click="chooseDate(vasibeDays[(i - 1) * 7 + (j - 1)])"
            >
              {{ vasibeDays[(i - 1) * 7 + (j - 1)].getDate() }}
            </span>
          </div>
        </div>
      </div>
      <div class="pannel-footer">今天</div>
    </div>
  </div>
</template>
12
<script>
import * as utils from './../util/util'

export default {
  data() {
    let { year, month } = utils.getYearMonthDay(this.value)
    return {
      // 这个变量使用控制面板是否可见
      isVisible: false,
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      time: { year, month },
    }
  },
  /*
    自定义指令
  */
  directives: {
    /**
     * 指令的生命周期
     */
    ClickOutside: {
      // 把事件绑定给document上，看一下点击的是否是当前这个元素内部
      bind(el, bindings, vnode) {
        console.log('ClickOutside bind >>> ', el, bindings, vnode)
        let handler = (e) => {
          console.log('ClickOutside bind handler >>> ', e.target, vnode)
          if (el.contains(e.target)) {
            console.log('包含')
            // 判断一下是否当前面板已经显示出来了
            if (!vnode.context.isVisible) {
              console.log('focus')
              vnode.context.focus()
            }
          } else {
            console.log('不包含')
            if (vnode.context.isVisible) {
              console.log('blur')
              vnode.context.blur()
            }
          }
        }
        el.handler = handler
        document.addEventListener('click', handler)
      },
      unbind(el) {
        document.removeEventListener('click', el.handler)
      },
    },
  },
  props: {
    value: {
      type: Date,
      // 对象或者数组：返回的默认值必须是一个函数类型
      default: () => new Date(),
    },
  },
  computed: {
    formatDate() {
      // getFullYear getMonth getDate
      let { year, month, day } = utils.getYearMonthDay(this.value)
      return `${year}-${month + 1}-${day}`
    },
    vasibeDays() {
      //  获取当前是周几
      let { year, month } = utils.getYearMonthDay(utils.getDate(this.time.year, this.time.month, 1))
      //获取当前月份的第一天
      let currentFirstDay = utils.getDate(year, month, 1)
      console.log('获取当前月份的第一天', currentFirstDay)
      //  获取当前是周几 把天数往前移动 几天
      let week = currentFirstDay.getDay()
      console.log('获取当前是周几', week)
      //  开始的天数
      let startDay = currentFirstDay - (week - 1) * 60 * 60 * 1000 * 24
      //  循环42天
      let arr = []
      for (let i = 0; i < 42; i++) {
        // 一次循环出42天
        arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24))
      }
      return arr
    },
  },
  methods: {
    // 获取焦点，显示面板
    focus() {
      this.isVisible = true
    },
    // 失去焦点，隐藏面板
    blur() {
      this.isVisible = false
    },
    /**
     * 是否当前月
     * 根据用户传入的值进行判断
     * @param date 日期
     */
    isCurrentMonth(date) {
      let { year, month } = utils.getYearMonthDay(utils.getDate(this.time.year, this.time.month, 1))
      let { year: y, month: m } = utils.getYearMonthDay(date)
      return year === y && month === m
    },
    /**
     * 是否是今天
     * @param date  日期
     * @returns {boolean}
     */
    isToday(date) {
      let { year, month, day } = utils.getYearMonthDay(new Date())
      let { year: y, month: m, day: d } = utils.getYearMonthDay(date)
      return year === y && month === m && day === d
    },
    /**
     * 判断日期是否被选中
     * @param date
     * @returns {boolean}
     */
    isSelect(date) {
      // 当前的年月日
      let { year, month, day } = utils.getYearMonthDay(this.value)
      let { year: y, month: m, day: d } = utils.getYearMonthDay(date)
      return year === y && month === m && day === d
    },
    /**
     * 选中日期
     * @param date
     */
    chooseDate(date) {
      // 更新 年 月
      this.time = utils.getYearMonthDay(date)
      // 子组件发射 input 事件，把值传给父组件
      this.$emit('input', date)
      // 关闭弹框
      this.blur()
    },
    /**
     * 去年
     */
    preYear() {
      // 根据当前的年月获取一个日期
      let date = utils.getDate(this.time.year, this.time.month, 1)
      date.setFullYear(date.getFullYear() - 1)
      this.time = utils.getYearMonthDay(date)
    },
    /**
     * 明年
     */
    nextYear() {
      // 根据当前的年月获取一个日期
      let date = utils.getDate(this.time.year, this.time.month, 1)
      date.setFullYear(date.getFullYear() + 1)
      this.time = utils.getYearMonthDay(date)
    },
    /**
     * 上一个月
     */
    preMonth() {
      // 根据当前的年月获取一个日期
      let date = utils.getDate(this.time.year, this.time.month, 1)
      date.setMonth(date.getMonth() - 1)
      this.time = utils.getYearMonthDay(date)
    },
    /**
     * 下一个月
     */
    nextMonth() {
      // 根据当前的年月获取一个日期
      let date = utils.getDate(this.time.year, this.time.month, 1)
      date.setMonth(date.getMonth() + 1)
      this.time = utils.getYearMonthDay(date)
    },
  },
}
</script>

<style lang="stylus">
.pannel
  width: 32px * 7px
  position: absolute
  background: #fff
  box-shadow 2px 2px 2px pink,-2px -2px 2px pink
  .pannel-nav
    display flex
    justify-content space-around
    height 30px
    span
      cursor pointer
      user-select none
  .pannel-content
    .cell
      display inline-flex
      justify-content center
      align-items center
      width 32px
      height 32px
      font-weight bold
      box-sizing border-box
    .cell-days:hover, .select
      border 1px solid pink
  .pannel-footer
    height 30px
    text-align center

.notCurrentMonth
  color gray

.today
  background red
  color #fff
  border-radius 4px
</style>
