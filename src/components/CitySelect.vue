<template>
  <div id="cityCode">
    <el-select size="small" v-model="provinceCode" @change="filterCity" placeholder="请选择省/直辖市">
      <el-option v-for="item in provinceOptions" :key="item.codeid" :value="item.codeid"
                 :label="item.cityName"></el-option>
    </el-select>
    <el-select size="small" v-model="cityCode" @change="filterArea" placeholder="请选择市/辖区">
      <el-option v-for="item in cityOptions" :key="item.codeid" :value="item.codeid" :label="item.cityName"></el-option>
    </el-select>
    <el-select size="small" v-model="areaCode" @change="emitData" placeholder="请选择区/县">
      <el-option v-for="item in areaOptions" :key="item.codeid" :value="item.codeid" :label="item.cityName"></el-option>
    </el-select>
  </div>
</template>

<script>
import { getAreaJson } from '../utils/api'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CitySelect',
  props: {
    areaid: String
  },
  model: {
    props: 'areaid',
    event: 'returnBack'
  },
  data () {
    return {
      // areas: [], // 地区数据
      provinceCode: '',
      provinceOptions: [],
      cityCode: '',
      cityOptions: [],
      areaCode: '',
      areaOptions: []
    }
  },
  computed: {
    ...mapGetters(['areas']),
    changedValue: function () {
      return [this.provinceCode, this.cityCode, this.areaCode] // 方便外部根据各级菜单过滤信息
    }
  },
  created () {
    this.getAllAreaJson()
  },
  mounted () {
    this.updateData()
  },
  methods: {
    ...mapActions(['updateAreas']),
    async getAllAreaJson () {
      if (!this.areas.length) {
        const areas = await getAreaJson()
        this.updateAreas(areas.RECORDS)
      }
      this.provinceOptions = this.areas.filter(item => item.parentid === '0') // 获取省级地区
    },
    filterCity (province) {
      this.cityCode = ''
      this.areaCode = ''
      this.areaOptions = []
      this.cityOptions = this.areas.filter(item => item.parentid === province) // 获取对应市级地区
      this.emitData()
    },
    filterArea (city) {
      this.areaCode = ''
      this.areaOptions = this.areas.filter(item => item.parentid === city) // 获取县级地区
      this.emitData()
    },
    emitData () {
      this.$emit('valueChange', this.changedValue) // 自定义事件
      this.$emit('returnBack', this.changedValue) // v-model返回值
    },
    updateData () {
      if (this.areaid) {
        this.provinceCode = this.areaid.substring(0, 2)
        this.filterCity(this.provinceCode)
        this.cityCode = this.areaid.substring(0, 4)
        this.filterArea(this.cityCode)
        this.areaCode = this.areaid
        this.emitData()
      } else {
        this.provinceCode = ''
        this.provinceOptions = []
        this.cityCode = ''
        this.cityOptions = []
        this.areaCode = ''
        this.areaOptions = []
      }
    }
  }
}
</script>

<style scoped>

</style>
