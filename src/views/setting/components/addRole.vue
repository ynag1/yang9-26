<template>
  <el-dialog
    title="新增角色"
    width="50%"
    :visible="dialogVisible"
    :before-close="handleClose"
  >
    <el-form
      ref="roleDialogForm"
      label-width="80px"
      :model="fromData"
    >
      <el-form-item
        prop="name"
        label="角色"
        :rules="[{required:true,message:'角色名称不能为空',trigger:'blur'}]" >
        <el-input v-model="fromData.name" />
      </el-form-item>
      <el-form-item label="描述" prop="decpription">
        <el-input v-model="fromData.decpription" type="textarea" row="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button v-loading="loading" type="primary" @click="handleAdd">确 定</el-button>
    </el-row>
  </el-dialog>
</template>
<script>
/* eslint-disable */
import {addRole} from '@/api/setting'
export default {
	props:{
		dialogVisible:{
			type: Boolean,
      default: false
    }
		},
		data(){
			return {
				loading: false,
				fromData :{
					name:'',
					decpription:""
				}
			}
		},
	methods:{
		handleClose(){
			this.$emit('update:dialogVisible', false)
			this.$refs.roleDialogForm.resetFields()
		},
		async handleAdd(){
			try{
				await this.$refs.roleDialogForm.validate()
				this.loading=true
				await addRole(this.fromData)
				this.$emit('refreshList') // 新增之后刷新
				this.$message.success('新增成功')
				this.handleClose()
			} catch (e) {  
        console.log(e)
      }finally{
				this.loading=false
			}
		}
	}
}
</script>
<style >
	
</style>
