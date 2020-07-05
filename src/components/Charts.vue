<template>
  <el-row :gutter="10" class="container">
    <el-col :xl="{span:11,offset:1}" :lg="{span:18, offset:5}" :md="{span:24}">
      <div class="map" id="map"></div>
    </el-col>
    <el-col :xl="{span:11,offset:1}" :lg="{span:18, offset:5}" :md="{span:24}">
      <div class="line" id="line"></div>
    </el-col>
  </el-row>
</template>

<script>
import echarts from 'echarts'

require('echarts/map/js/china')
export default {
  name: 'charts',
  props: {
    mapData: Array, // 地图显示数据
    dataByDate: Array // 日期新增数据
  },
  methods: {
    initMap () {
      const myMap = echarts.init(document.querySelector('#map'))
      myMap.setOption({
        tooltip: {
          formatter: function (params, ticket, callback) {
            return params.seriesName + '<br />' + params.name + '：' + params.value
          }
        },
        title: { text: '全国疫情地图-现存确诊' },
        visualMap: {
          min: 0,
          max: 1000,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          inRange: {
            color: ['#f7f7f7', '#ae212c']
          },
          show: true
        },
        geo: {
          map: 'china',
          roam: false,
          zoom: 1.23,
          label: {
            normal: {
              show: true,
              fontSize: '10',
              color: 'rgba(0,0,0,0.7)'
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: '#F3B329',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [
          {
            name: '现存确诊',
            type: 'map',
            geoIndex: 0,
            data: this.mapData
          }
        ]
      })
    },
    initLine () {
      const myLine = echarts.init(document.querySelector('#line'))
      myLine.setOption({
        title: { text: '全国新增确诊图' },
        xAxis: {
          type: 'category',
          data: this.dataByDate.map(item => item.date).reverse()
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.dataByDate.map(item => item.cases).reverse(),
          type: 'line'
        }]
      })
    }
  },
  mounted () {
    this.initMap()
    this.initLine()
  }
}
</script>

<style lang="less" scoped>
  .container {
    margin: 20px auto;

    .map {
      width: 800px;
      height: 600px;
      background: #fefefe;
    }

    .line {
      width: 800px;
      height: 600px;
      background: #fefefe;
    }
  }
</style>
