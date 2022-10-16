<template>
  <div>
    <el-upload
      v-loading="loading"
      class="el-upload"
      action="#"
      list-type="picture-card"
      :on-preview="onpreview"
      :file-list="fileList"
      :on-remove="onremove"
      :on-change="onChange"
      :before-upload="beforeupload"
      :http-request="onhttpRequest"
      :limit="1"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片预览" width="50%" :visible.sync="dialogVisible">
      <img style="width:100%" :src="fileImg" alt="">
    </el-dialog>
  </div>
</template>
<script>
import COS from 'cos-js-sdk-v5'
console.log(cos)
// id 和key 是后端提供的
const cos = new COS({
  SecretId: 'AKIDoSt7687yb0EKCqLhoiNo22bv1uZzA8sN',
  SecretKey: 'KPHH2Ys1zlIdkcFgMSO7f071iGj061jD'
})
export default {
  name: 'UploadImg',
  props: {
    defaulturl: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      fileImg: '',
      fileList: [],
      loading: false
    }
  },
  watch: {
    defaulturl() {
      this.fileList.push({
        name: 'default', url: this.defaulturl
      })
    }
  },
  methods: {
    onpreview(file) {
      this.fileImg = file.url
      this.dialogVisible = true
    }, // 删除
    onremove(file, fileList) {
      this.fileList = fileList
    },
    onChange(file, fileList) {
      // 本地选择上传 原来数据+选择的数据
      this.fileList = fileList
    },
    onhttpRequest({ file }) {
      this.loading = true
      cos.putObject({
        Bucket: 'yang10-13-1314348449', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        // err  上次传失败的信息，如果成功err为null
        // data 上传成功的信息
        this.loading = false
        if (err) return this.$message.error('上传图片失败')
        this.$emit('on-success', {
          img: 'http://' + data.Location
        })
      })
    }, // 图片
    beforeupload(file) {
      // 限制文件类型
      const types = ['image/jpeg', 'image/gif']
      const l = types.includes(file.type)
      if (!l) {
        this.$message.error('请上传' + (types.join(',') + '格式'))
        return false
      }
      // 限制文件大小
      const maxSize = 1 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小最大不能超过1MB')
        return false
      }
    }
  }

}
</script>
<style lang="scss" scope>
  .el-upload{
    width: 148px;
    height: 148px;
    overflow: hidden;
  }
</style>
