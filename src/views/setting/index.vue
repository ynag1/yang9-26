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
        </el-tab-pane>
				 <el-table v-loading="loading"
           style="width: 100%" :data="rows">
         <el-table-column
          label="序号" width="120" type="index">
         </el-table-column>
         <el-table-column
         label="角色名称" width="240" prop="name">
         </el-table-column>
         <el-table-column label="描述" prop="description"></el-table-column>
         <el-table-column label="操作">
					  <el-button size="small" type="success">分配权限</el-button>
            <el-button size="small" type="primary">编辑</el-button>
            <el-button size="small" type="danger">删除</el-button>
				 </el-table-column>
         </el-table>
				 <el-row type="flex" justify="center" align="middle" style="height: 60px">
         <!-- // background   添加背景
              // current-page 当前的页面
             // page-size    每一页展示的条数
             // page-sizes   每页显示个数选择器的选项设置
             // total        总共多少条数据
             // layout       布局
             // current-change 改变当前页码的触发（current-page 值改变的时候触发）
             // size-change 改变页面的数据条数的时候 触发（page-size 值改变的时候触发） -->
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
         <el-tab-pane label="公司信息" name="secound">公司信息</el-tab-pane>
      </el-tabs>
    </el-card>
		<addRole :dialogVisible.sync="dialogVisible" @refreshList='getRoleList'/>
  </div>
</template>

<script>
/* eslint-disable */
import { getRoleList } from '@/api/setting'
import addRole from './components/addRole'
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
		loading:false
    }
  },

  mounted() {
    this.getRoleList()
  },

  methods: {
    async getRoleList() {
      try {
			this.loading=true
	    const { total, rows } = await getRoleList(this.page)
		  this.total = total
		  this.rows =	rows
      } catch (e) {
        console.log(e)
      }finally{
				this.loading=false
			}
    },
		small(){
			this.dialogVisible=true
		}
  }
}
</script>

<style lang="scss" scoped>

</style>
