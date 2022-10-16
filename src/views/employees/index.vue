<template>
  <!-- 插槽新语法 -->
  <!-- <template #before>
        <span>共25条记录</span>
      </template> -->
  <!-- <template v-slot:before>
        <span>共25条记录</span>
      </template> -->
  <!-- 作用域插槽 -->
  <!-- <template v-slot="scope">
        <span>共25条记录{{scope}}</span>
      </template> -->
  <div class="app-container">
    <PageTools>
      <template #before>
        <span slot="before">共166条记录</span>
      </template>
      <template #after>
        <el-button size="small" type="warning" @click="$router.push('./import')">导入</el-button>
        <el-button size="small" type="danger" @click="exportEmp">导出</el-button>
        <el-button size="small" type="primary" @click="handleEmploy">新增员工</el-button>
      </template>
    </PageTools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table v-loading="loading" border :data="list">
        <el-table-column label="序号" sortable="" width="80" type="index" />
        <el-table-column label="头像">
          <template slot-scope="{row}">
            <img style="wodth:100px;height: 100px;" :src="row.staffPhoto" alt="" @click="label">
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatterFn">
          <!-- <template slot-scope="{ row }">
						过滤器解决文本格式化
            <span>{{ row.getEmployeeList }}</span>
          </template> -->
        </el-table-column>
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template slot-scope="{ row }">
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" prop="enableState">
          <template slot-scope="{ row }">
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{ row }">
            <el-button type="text" size="small" @click="goDetail(row)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="deleteEmployee(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          layout="prev, pager, next,sizes"
          :total="total"
          :current-page.sync="page.page"
          :page-size.sync="page.size"
          :page-sizes="[2,5,10]"
          @current-change="getEmployeeList"
          @size-change="getEmployeeList"
        />
      </el-row>
    </el-card>
    <!-- 新增组件 -->
    <addemployee :dialogVisible.sync="dialogvisble" />
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <canvas ref="canvas" />
    </el-dialog>
  </div>
</template>

<script>
import EmployeeEnum from '@/api/constant/employees'
console.log(EmployeeEnum)
import { getEmployeeList, delEmployee } from '@/api/employees'
import PageTools from '@/components/PageTools/index.vue'
import addemployee from './components/add-employee.vue'
import qrcode from 'qrcode'
export default {
  name: 'HrsaasIndex',
  components: { PageTools, addemployee },
  data() {
    return {
      dialogTableVisible: false,
      page: {
        page: 1, // 当前页码
        size: 10
      },
      loading: false,
      hireType: EmployeeEnum.hireType,
      list: [], // 接数据的
      total: 0, // 总数
      dialogvisble: false
    }
  },

  mounted() {
    this.getEmployeeList()
  },

  methods: {
    async getEmployeeList() {
      this.loading = true
      try {
        const { rows, total } = await getEmployeeList(this.page)
        this.list = rows
        this.total = total
      } finally {
        this.loading = false
      }
    },
    formatterFn(row, column, cellvalue) {
      const res = this.hireType.find(ele => ele.id === cellvalue)
      // console.log(res)
      return res && res.value || '非正式'
    },
    handleEmploy() {
      // 点击的时候需要弹出新增员工，新增员工的弹窗
      this.dialogvisble = true
    }, // 点击删除
    async deleteEmployee(id) {
      try {
        this.$confirm('确认删除该员工吗', '提示', {
          type: 'warning'
        })
        await delEmployee(id)// 调用删除接口
        this.getEmployeeList()// 删除之后刷新列表
      } catch (e) { console.log(e) }``
    }, //  点击导出
    async exportEmp() {
      // 文件懒加载
      const { export_json_to_excel } = await import('@/vendor/Export2Excel.js')
      const { rows } = await getEmployeeList({
        page: 1, // 当前页码
        size: this.total// 获取所有数据
      })
      // 表内容的数据和员工列表是相同的，所以根据员工列表生成
      const exportExcelMap = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const header = Object.keys(exportExcelMap)
      const data = rows.map(item => {
        // item 每一项的员工数据
        return header.map(h => {
          if (h === '聘用形式') {
            // hireType 的一个方法，id:1,value:正式
            const find = this.hireType.find(hire => hire.id === item[exportExcelMap[h]])
            return find ? find.value : '未知'
          }
          return item[exportExcelMap[h]]
        })
      })
      export_json_to_excel({
        header, // 表头 必填
        data, // 具体数据 必填
        filename: '黑马员工列表', //  导出文件名 非必填
        autoWidth: true, // 单元格是否要自适应宽度 非必填
        bookType: 'xlsx' // 导出文件类型 非必填
      })
    }, // 点击查看
    goDetail(row) {
      this.$router.push('/employees/detail' + row.id)
    },
    label(staffPhoto) {
      // vue 数据驱动视图组件系统
      // 数据变化：数据变化--视图变化
      // 为什么？ 如果是同步的 将视图更新（异步的
      // 等所有数据变化了
      if (!staffPhoto) return this.$message.error('暂无头像')
      console.log(staffPhoto)
      this.dialogTableVisible = true
      // this.$nextTick 方法、视图更新视图之后触发，获取到最新的视图
      this.$nextTick(() => {
        qrcode.toCanvas(this.$refs.canvas, 'sample text', function(error) {
          if (error) console.error(error)
          console.log('success!')
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
