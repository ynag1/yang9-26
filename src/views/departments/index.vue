<template>
  <div class="departments-container">
    <!-- 头部信息 -->
    <el-card>
      <tree-tools :tree-node="company" :isRoot="false" @addDepts="addDepts" />
    </el-card>
    <!-- 树枝分类 -->
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
      <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
      <tree-tools slot-scope="{ data }" :tree-node="data" @addDepts="addDepts" />
    </el-tree>
		<!-- 把currentNode 传递给 add  -->
    <add-dept :show-dialog.sync="showDialog" :tree-node="currentNode" />
  </div>
</template>

<script>
/* eslint-disable */
import { getDepartments } from '@/api/departments'
import treeTools from './components/tree-tools.vue'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  components: {
    treeTools,
		AddDept
  },
  data() {
    return {
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
			showDialog:false,
			currentNode:{}
    }
  },
  mounted() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
     const { depts ,companyName, companyManage} = await getDepartments()
		 this.departs = tranListToTreeData(depts, '')
		//  console.log(this.departs)
		 this.company = { name:companyName, manager: companyManage, id:'' } 
    },
		addDepts(node){
			this.showDialog=true
			this.currentNode=node
		}
  }
}
</script>

<style lang="scss">
.departments-container {
  width: 900px;
  margin: 20px auto;
    .el-tree-node__content {
      padding-right: 0px !important;
    }

}
</style>
