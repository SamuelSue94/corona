<template>
  <div class="infos">
    <national-data-panel :rawData="dataByDate"
                         :nowCases="nowCases"
                         :totalCases="totalCases"
                         :totalRecovered="totalRecovered"
                         :totalDeaths="totalDeaths"
                         v-if="dataByDate.length"></national-data-panel>
    <charts v-if="mapData.length" :mapData="mapData" :dataByDate="dataByDate"></charts>
    <el-table v-loading="loading"
      :data="provinceState" row-key="id"
              :lazy="true" :load="load"
              :tree-props="{hasChildren: 'hasChildren'}" max-height="600">
      <el-table-column fixed prop="cityName" label="地区"></el-table-column>
      <el-table-column label="现存确诊" prop="now_cases">
      </el-table-column>
      <el-table-column prop="total_cases" label="累计确诊"></el-table-column>
      <el-table-column prop="total_deaths" label="累计死亡"></el-table-column>
      <el-table-column prop="total_recovered" label="累计治愈"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import NationalDataPanel from '@/components/NationalDataPanel'
import Charts from '@/components/Charts'
import { getNationalData, getProvinceData, getCityData } from '@/utils/api'
export default {
  name: 'ShowInfo',
  components: { NationalDataPanel, Charts },
  data () {
    return {
      dataByDate: [], // 全国统计信息
      provinceState: [], // 省级信息
      nowCases: 0, // 现存确诊
      totalCases: 0, // 累计确诊
      totalRecovered: 0, // 累计治愈
      totalDeaths: 0, // 累计死亡
      mapData: [] // 地图数据,
    }
  },
  computed: {
    loading: function () {
      return this.provinceState.length === 0
    }
  },
  methods: {
    // 获取全国统计数据
    async nationalData () {
      const response = await getNationalData()
      this.dataByDate = response.data
      this.update()
    },
    // 更新全国信息
    update () {
      for (const dayData of this.dataByDate) {
        this.nowCases += dayData.cases || 0
        this.totalRecovered += dayData.recovered || 0
        this.totalDeaths += dayData.deaths || 0
        this.totalCases += (this.nowCases + this.totalRecovered + this.totalDeaths)
      }
    },
    // 获取省级信息
    async provinceData () {
      const response = await getProvinceData()
      this.provinceState = response.data.map(item => {
        item.hasChildren = true
        item.now_cases = item.total_cases || 0 - item.total_deaths || 0 - item.total_recovered || 0
        return item
      })
      this.provinceState.forEach(item => {
        const obj = {}
        obj.name = item.cityName
        obj.value = item.now_cases
        this.mapData.push(obj)
      })
    },
    load (tree, treeNode, resolve) {
      console.log(tree.id)
      getCityData(tree.id).then(res => {
        resolve(res.data.map(item => {
          item.now_cases = item.total_cases || 0 - item.total_deaths || 0 - item.total_recovered || 0
          return item
        }))
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.nationalData()
    this.provinceData()
  }
}
</script>

<style lang="less" scoped>
</style>
