<template>
  <div class="home"
       @drag="handleClick">
    <div class="content">
      将文件拖放到这里
    </div>
    <div class="operation"
         v-if="show">
      <div class="btn_wrap">
        <span class="btn">复制代码</span>
        <span class="btn">预览</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true
    }
  },
  methods: {
    handleClick() {
      console.log('handleClick')
    },
    song() {
      console.log('xx')
    }
  }
}
</script>

<style lang="scss">
.home {
  .content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3D(-50%, -50%, 0);
    color: #fff;
    width: 142px;
    height: 142px;
    border: 2px dashed #7e7d7c;
    border-radius: 8px;
    line-height: 142px;
    font-size: 14px;
    text-align: center;
  }
  .operation {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 30px;
    border: 1px solid #555555;
    .btn_wrap {
      display: flex;
      position: absolute;
      height: 16px;
      right: 25px;
      top: 6px;
      align-items: center;
      .btn {
        background: #636363;
        border-radius: 4px;
        padding: 0 5px;
        height: 16px;
        font-size: 12px;
        color: #ffffff;
        margin-right: 10px;
      }
    }
  }
}
</style>