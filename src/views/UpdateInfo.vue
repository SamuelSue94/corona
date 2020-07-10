<template>
  <div class="container">
    <div class="row">
      <city-select @valueChange="handleValueChange" class="filter"></city-select>
      <el-form :inline="true" :model="filterForm" class="demo-form-inline" size="small">
        <el-form-item>
          <el-input v-model="filterForm.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filterForm.idcard" placeholder="身份证"></el-input>
        </el-form-item>
      </el-form>
      <el-link type="primary" class="add-btn" @click="handleNew">+ 新建人员信息</el-link>
    </div>
    <el-table v-loading="loading" row-key="id" :data="tableData" max-height="600">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="id_card" label="身份证号"></el-table-column>
      <el-table-column label="所在地">
        <template slot-scope="scope">
          {{getAreaStr(scope)}}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{getStatus(scope)}}
        </template>
      </el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope)" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="handleDel(scope)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handlePageChange"
                   background
                   layout="prev, pager, next"
                   :page-count="totalPages">
    </el-pagination>
    <!--    对话框区域 -->
    <el-dialog :title="dialogTitle"
               :visible.sync="dialogVisible"
               width="60%">
      <!--表单-->
      <el-form :model="editPerson">
        <el-form-item label="姓名" required>
          <el-input v-model="editPerson.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证" required>
          <el-input v-model="editPerson.id_card"></el-input>
        </el-form-item>
        <el-form-item label="所在地">
          <city-select v-model="editPerson.area_code" ref="edit"
                       class="filter"></city-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="editPerson.status">
            <el-radio-button label="0">治愈</el-radio-button>
            <el-radio-button label="1">确诊</el-radio-button>
            <el-radio-button label="2">死亡</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CitySelect from '@/components/CitySelect'
import { createPerson, delPerson, getPeople, getPeopleCount, updatePerson } from '../utils/api'
import { throttle } from '../utils/tools'
import { mapGetters } from 'vuex'

let fn = null
export default {
  name: 'UpdateInfo',
  data () {
    return {
      tableData: [], // 查询的人员数据,
      codeid: '', // 查询params
      loading: true,
      total: 0,
      pageSize: 15,
      currentPage: 1,
      filterForm: {
        name: '',
        idcard: ''
      },
      dialogTitle: '编辑信息',
      dialogVisible: false,
      editPerson: {
        id: 0,
        name: '',
        id_card: '',
        area_code: '',
        status: 1
      }
    }
  },
  computed: {
    totalPages: function () {
      return Math.ceil(this.total / this.pageSize)
    },
    ...mapGetters(['areas'])
  },
  components: { CitySelect },
  methods: {
    handleValueChange (codes) {
      for (const code of codes) {
        if (code) this.codeid = code
      }
      this.getCount()
      this.getData()
    },
    async getData () {
      const response = await getPeople(this.codeid, this.currentPage, this.pageSize, this.filterForm.name, this.filterForm.idcard)
      this.tableData = response.data
      this.loading = false
    },
    async getCount () {
      const response = await getPeopleCount(this.codeid, this.filterForm.name, this.filterForm.idcard)
      this.total = response.data[0].counts
    },
    handlePageChange (page) {
      this.loading = true
      this.currentPage = page
      this.getData()
    },
    updateData () {
      this.getCount()
      this.getData()
    },
    getAreaStr ({ row }) {
      const province = this.areas.find(item => item.codeid === row.areacode.toString().substring(0, 2))
      const city = this.areas.find(item => item.codeid === row.areacode.toString().substring(0, 4))
      const area = this.areas.find(item => item.codeid === row.areacode.toString())
      if (province && city && area) return province.cityName + city.cityName + area.cityName
    },
    getStatus ({ row }) {
      switch (row.status) {
        case 0:
          return '治愈'
        case 1:
          return '确诊'
        case 2:
          return '死亡'
      }
    },
    handleNew () {
      this.dialogTitle = '新建信息'
      this.editPerson = {
        id: 0,
        name: '',
        id_card: '',
        area_code: '',
        status: 1
      }
      this.dialogVisible = true
      setTimeout(() => {
        this.$refs['edit'].updateData()
        this.$refs['edit'].getAllAreaJson()
      }, 50)
    },
    handleEdit ({ row }) {
      this.dialogTitle = '编辑信息'
      console.log('row:', row.areacode)
      this.editPerson = {
        id: row.id,
        name: row.name,
        id_card: row.id_card,
        area_code: row.areacode.toString(),
        status: row.status
      }
      this.$nextTick(() => {
        this.$refs['edit'].updateData()
      })
      this.dialogVisible = true
    },
    async handleDel ({ row }) {
      const res = await delPerson(row.id)
      if (res.data.affectedRows) {
        // 删除成功
        this.$message.success('删除成功')
        this.updateData()
      }
    },
    handleCancel () {
      this.dialogVisible = false
    },
    handleAreaChange (codes) {
      this.editPerson.areacodes = codes
    },
    async handleSubmit () {
      if (this.dialogTitle === '编辑信息') {
        const resp = await updatePerson({
          id: this.editPerson.id,
          name: this.editPerson.name,
          id_card: this.editPerson.id_card,
          areacode: this.editPerson.areacodes[2],
          status: this.editPerson.status
        })
        if (resp.data.changedRows) {
          this.$message.success('修改成功')
          this.updateData()
          this.dialogVisible = false
        }
      } else {
        const resp = await createPerson({
          name: this.editPerson.name,
          id_card: this.editPerson.id_card,
          areacode: this.editPerson.areacodes[2],
          status: this.editPerson.status
        })
        if (resp.data.affectedRows) {
          this.$message.success('添加成功')
          this.updateData()
          this.dialogVisible = false
        }
      }
    }
  },
  created () {
    this.updateData()
  },
  watch: {
    filterForm: {
      deep: true,
      handler (newVal) {
        this.loading = true
        if (!fn) fn = throttle(this.updateData, 500)
        fn()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~style/common.less';

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    vertical-align: middle;

    .row {
      margin-top: 20px;
      display: flex;
      flex-direction: row;

      .success {
        color: @color-success;
      }

      .danger {
        color: @color-danger;
      }

      .info {
        color: @color-grey;
      }

      .add-btn {
        display: inline-block;
        height: 32px;
        line-height: 32px;
      }
    }
  }
</style>
