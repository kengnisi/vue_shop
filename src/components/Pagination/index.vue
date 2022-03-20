<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="jumpPre">上一页</button>
    <button
      v-show="startNum != 1"
      @click="jumpNum(1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-show="startNum > 2">···</button>

    <button
      :class="{ active: pageNo == num }"
      v-show="num >= startNum"
      v-for="(num, index) in endNum"
      :key="index"
      @click="jumpNum(num)"
    >
      {{ num }}
    </button>

    <button v-show="endNum < totalPage - 2">···</button>
    <button
      v-show="endNum != totalPage"
      @click="jumpNum(totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="jumpNext">下一页</button>

    <button style="margin-left: 30px">总共{{ total }}个</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出来纳许的页码的起始数字与结束数字
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this;
      // 先定义两个变量存储起始数字与结束数字
      let start = 0,
        end = 0;
      // 连续页码数字5，如果出现不正常现象,总也数没有连续页多
      if (continues > totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > this.totalPage) {
          start = this.totalPage - continues + 1;
          end = this.totalPage;
        }
      }
      return { start, end };
    },
    startNum() {
      return this.startNumAndEndNum.start
    },
    endNum() {
      return this.startNumAndEndNum.end
    }
  },
  methods: {
    jumpNum(num) {
      this.$emit("jumpNum", num);
    },
    jumpPre() {
      this.$emit("jumpNum", this.pageNo - 1);
    },
    jumpNext() {
      this.$emit("jumpNum", this.pageNo + 1);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: rgb(243, 171, 39);
      color: #fff;
    }
  }
}
</style>