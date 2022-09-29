<template>
  <div class="departments-container">
    <!-- 头部信息 -->
    <el-card>
      <tree-tools :tree-node="company" :isRoot="false" />
    </el-card>
    <!-- 树枝分类 -->
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
      <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
      <tree-tools slot-scope="{ data }" :tree-node="data" />
    </el-tree>
  </div>
</template>

<script>
import { getDepartments } from '@/api/departments'
import treeTools from './components/tree-tools.vue'
export default {
  components: {
    treeTools
  },
  data() {
    return {
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' }
    }
  },
  mounted() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      await getDepartments()
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
