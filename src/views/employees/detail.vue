<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane lazy label="登录账户设置" name="first">
          <!-- 放置表单 -->
          <!--表单校验：  ：model:'表单数据' ：rules="表单的校验规则"
					form-item 里面添加prop属性
					-->
          <el-form ref="userForm" :model="userInfo" :rules="rules" label-width="120px" style="margin-left: 120px; margin-top:30px">
            <el-form-item label="姓名:" prop="username">
              <el-input v-model="userInfo.username" style="width:300px" />
            </el-form-item>
            <el-form-item label="新密码:" prop="password">
              <el-input v-model="userInfo.password" style="width:300px" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveUser">更新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane lazy label="个人详情" name="second"><userinfo /></el-tab-pane>
        <el-tab-pane lazy label="岗位信息" name="third"><jobinfo /></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script >
/* eslint-disable */
import { getUserDetailById,saveUserDetailById } from '@/api/user'
import jobinfo from './components/job-info.vue'
import userinfo from './components/user-info'
import Cookies from 'js-cookie'
export default {
components:{jobinfo,userinfo},
	data () {
		return {
			activeName:Cookies.get('activeName')|| 'first',
			userInfo:{},
			rules:{
				username:[
					{required:true, message:'姓名不能为空',trigger: 'blur'},
				  {min:2,max:10,message:'长度为2-10个字符',trigger: 'blur'}
				],
				password:[
					{required:true, message:'密码不能为空',trigger: 'blur'},
				  {min:6,message:'密码长度为最小6',trigger: 'blur'}
				]
		  }
		}
	},
  created() {
		this.getUserDetailById()
		},
  methods:{ 
		async getUserDetailById(){
			// getUserDetailById 获取员工信息
			const res=await getUserDetailById(this.$route.params.id)
			console.log(res)
			this.userInfo=res
		},// 点击更新用户信息
		async saveUser(){
			try{
				// validate 是对整个表单进行校验的方法
				await this.$refs.userForm.validate()
				await saveUserDetailById(this.userInfo)
				this.$message.success('更新成功')
				console.log('校验规则完成')
			}catch(e){
				console.log(e)
			}
		},
		handleClick(){
		Cookies.set('activeName',this.activeName)
		}
	}
}
</script>
 
<style scoped lang='scss'>
</style>