<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="showDialog" @close="handleClose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="addDeptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button v-loading="loading" type="primary" size="small" @click="subimt">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
/* eslint-disable */
import { getDepartments,addDepartments } from "@/api/departments"
import {getEmployeeSimple} from '@/api/employees'
// 部门重点 在tree
export default {
	// 控制属性组件显示隐藏， 子到父， 用.sync 在关闭弹窗得时候 update
	props:{
		showDialog:{
			type:Boolean,
			default: false
		},
		treeNode:{
			type:Object,
			default:()=>({})
		}
	},
	data() {
		const checkCodeRepeat = async(rule, value, callback) => {
    // 先要获取最新的组织架构数据 部门编码
		// 在部门编码 整个模块中不允许重复
     const { depts } = await getDepartments()
		//  console.log(depts);
     const isRepeat = depts.some(item => item.code === value)
     isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) :  callback()
    }
		// 部门名称 同级部门中禁止出现重复部门
		// 重点是 同级部门如何重所有部门中，把同级部门的数据筛选出来
		// 先确定 父ID 先重 tree 拿到数据 在把数据送到父组件 父组件在把书名给到add
		const checkNode = async(rule, value, callback) => {
     const { depts } = await getDepartments()
		 // 找同级部门
     const isNode = depts.filter(item => item.pid === this.treeNode.id)
		const isRepeat = isNode.some(ele => ele.name === value) 
		 console.log(isNode)
		 isRepeat ? callback(new Error(`部门名称中已经有部门使用${value}编码`)) :  callback()
    }
		return{
			 formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
       },
			 rules: {
        name: [
          { required: true, message: '部门名称必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称1-50个字符', trigger: 'blur' },
				  {validator: checkNode, trigger: 'blur'}
        ],
        code: [
          { required: true, message: '部门编码必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码1-50个字符', trigger: 'blur' },
					{validator: checkCodeRepeat, trigger: 'blur'}
        ],
        manager: [
          { required: true, message: '部门负责人必填' }
        ],
        introduce: [
          { required: true, message: '部门介绍必填', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍1-300个字符', trigger: 'blur' }
        ]
       },
			 peoples:[],
			 loading: false
		}
	},
	created(){
		this.getEmployeeSimple()
	},
	methods:{
		handleClose() {
			this.$emit('update:showDialog', false)
			this.$refs.addDeptForm.resetFields()
			this.formData={
				name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
			}
		},
		async getEmployeeSimple(){
			this.peoples=await getEmployeeSimple()
			// console.log(this.peoples)
		},
		async subimt(){
			// 表单校验通过 validate()
			try{
				await this.$refs.addDeptForm.validate()
				this.loading=true
				await addDepartments({...this.formData, pid: this.treeNode.id})
				// 调用接口添加子部门，小于新增的部门pid设置当前部门的id，新增部门就成自己的子部门，确定按钮的 loading 状态，
				//接口新增成功之后，消息提示成功，
				this.$message.success('新增成功')
				//刷新父组件的组织架构，
				this.$parent.getDepartments()
				//关闭弹窗
				this.handleClose()
			}catch(e){
				console.log(e)
			}finally{
				this.loading=false
			}
		}
	}
}
</script>
<style scoped>

</style>