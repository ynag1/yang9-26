<!-- eslint-disable -->
<template>
  <div class="app-container">
    <el-card shadow="always">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-row :gutter="10">
            <el-button type="primary" style="margin-left:10px"  icon="el-icon-plus"
              size="small" @click="small">新增角色</el-button>
          </el-row>
						 <el-table v-loading="loading"
           style="width: 100%" :data="rows">
         <el-table-column
          label="序号" width="120" type="index">
         </el-table-column>
         <el-table-column
         label="角色名称" width="240" prop="name">
         </el-table-column>
         <el-table-column label="描述" prop="description"></el-table-column>
         <el-table-column label="操作" width="240">
					 <template slot-scope="{ row }">
					  <el-button size="small" type="success">分配权限</el-button>
            <el-button size="small" type="primary" @click="deitRple(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deitAdd(row.id)">删除</el-button>
          </template>
				 </el-table-column>
         </el-table>
				 <el-row type="flex" justify="center" align="middle" style="height: 60px">
				 <el-pagination
           background
					v-if="total>0"
           layout="prev, pager, next , sizes"
          :total="total"
					:current-page.sync="page.page"
					:page-size.sync="page.pagesize"
					:page-sizes="[2,3,10]"
					@current-change="getRoleList"
					@size-change="getRoleList"
					>
          </el-pagination>
					</el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="secound" >
				 <el-alert
          title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
          type="info"
          show-icon
          :closable="false"
          />
         <el-form :model="companyInfo" label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
            <el-input v-model="companyInfo.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item  label="公司地址">
              <el-input v-model="companyInfo.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
              <el-input v-model="companyInfo.mailbox" disabled style="width:400px" />
              </el-form-item>
             <el-form-item label="备注">
            <el-input v-model="companyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
        </el-form-item>
          </el-form>
</el-tab-pane>
      </el-tabs>
    </el-card>
		<addRole  ref="addRole" :dialogVisible.sync="dialogVisible" @refreshList='getRoleList'/>
  </div>
</template>

<script>
/* eslint-disable */
import { getRoleList ,deleteRole,getCompanyInfo} from '@/api/setting'
import addRole from './components/addRole'
import { mapGetters } from 'vuex'  
export default {
  name: 'HrsaasIndex',
	components:{addRole},
  data() {
    return {
			dialogVisible:false,
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 2
      },
      total: 0, // 记录总数
      rows: [],
		  loading:false,
			companyInfo:{}
    }
  },
computed:{
		...mapGetters(['companyId'])
	},
  mounted() {
    this.getRoleList()
  },
	created() {
  this.getCompanyInfo()
},
  methods: {
    async getRoleList() {
      try {
			this.loading=true
	    const { total, rows } = await getRoleList(this.page)
		  this.total = total
		  this.rows =	rows
			// total 大于0 平且 rows的length ===0时候是没有数据的 需要跳转到前一个页面 
			if(total>0 &&rows.length===0){
				this.page.page--
				 this.getRoleList()
			}
      } catch (e) {
        console.log(e)
      }finally{
				this.loading=false
			}
    },
		small(){
			this.dialogVisible=true
		},
		deitRple(row){
			// 绑定点击事件
			// 拿到当前行这条数据
			// ref 给到addRole fromData
			this.$refs.addRole.fromData={...row}
			this.dialogVisible=true
		},
		// 删除事件
		async deitAdd(id){
			try{
				 await this.$confirm('确认删除该角色吗', '提示',{
					cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
				 })
				 // 删除封装接口 重新调用列表
				await deleteRole(id)
				this.getRoleList()
			}catch(e){console.log(1)}
		},
		// 获取公司接口封装好
		// 拿到 companyId 
		// this.$store.state.user.userInfo.companyId
		// this.$store.state.geyyers.companyId
		// 调用获取公司接口
		async getCompanyInfo(){
		this.companyInfo=await getCompanyInfo(this.companyId)
		}
  }
}
</script>

<style lang="scss" scoped>

</style>
