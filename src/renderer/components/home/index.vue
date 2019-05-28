<template>
  <div class="home">
    <div class="content"
         @dragover.prevent
         @drop.prevent="fileDrop">
      将文件拖放到这里
    </div>
    <div class="text">
      {{fileName}}
    </div>
    <div class="operation"
         v-if="show">
      <div class="btn_wrap">
        <span class="btn"
              @click="copyClick"
              :data-clipboard-text="vueData">复制代码</span>
      </div>
      <div class="btn_wrap">
        <span class="btn1"
          @click="downloadIt">
          下载
        </span>
      </div>
    </div>
  </div>
</template>
<script>
const { ipcRenderer } = require('electron')

import Clipboard from 'clipboard'

export default {
  data() {
    return {
      show: false,
      vueData: '',
      fileName: '',
      flag: true
    }
  },
  methods: {
    fileDrop(e) {
      const path = e.dataTransfer.files[0].path
      this.fileName = e.dataTransfer.files[0].name
      ipcRenderer.send('path_file', path)
    },
    copyClick() {
      if (!this.flag) return
      this.flag = !this.flag
      const clipboard = new Clipboard('.btn')
      clipboard.on('success', () => {
        alert('复制成功')
        this.flag = !this.flag
        clipboard.destroy()
      })
      clipboard.on('error', () => {
        alert('复制失败')
        this.flag = !this.flag
        clipboard.destroy()
      })
    },
    downloadIt() {
      // 下载
      const text = this.vueData
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', this.fileName.split('.')[0]+'.vue');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element)
    }
  },
  mounted() {
    ipcRenderer.on('node_over', (event, arg) => {
      alert('成功')
      this.show = true
      this.vueData = arg
    })
    ipcRenderer.on('node_over_err', (event, err) => {
      alert('失败')
    })
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
  .text {
    width: 100%;
    position: fixed;
    color: #fff;
    font-size: 14px;
    bottom: 50px;
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
        cursor: pointer;
        background: #636363;
        border-radius: 4px;
        padding: 0 5px;
        height: 16px;
        font-size: 12px;
        color: #ffffff;
        margin-right: 10px;
      }
      .btn1 {
       cursor: pointer;
        background: #636363;
        border-radius: 4px;
        padding: 0 5px;
        height: 16px;
        font-size: 12px;
        color: #ffffff;
        margin-right: 0px; 
        position: fixed;
        left: 10px;
      }
    }
  }
}
.test {
  width: 100px;
  height: 100px;
  background: red;
}
</style>