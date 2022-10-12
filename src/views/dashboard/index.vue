<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <svg-icon iconClass="form"></svg-icon>
    <!-- <UploadExcel :beforeUpload="beforeUpload" :onSuccess="handleSuccess" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    // handleSuccess(data) {
    //   console.log('data', data)
    //   // 坐具体的业务逻辑
    // },
    // beforeUpload(file) {
    //   console.log('file', file)
    //   // 校验的规则 file.size单位是byte
    //   if (file.size > 9 * 1024) {
    //     this.$message.error('文件太大了，上传不了')
    //     return false
    //   }
    //   return true
    // }
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
