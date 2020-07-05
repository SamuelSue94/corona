<template>
  <div>
    <ul class="panel-group">
      <li class="panel-item">
        <p class="yesterday">较昨日:<span class="danger">{{nowCasesComparesToLastDay}}</span></p>
        <h3 class="number danger">{{nowCases}}</h3>
        <p class="title">现存确诊</p>
      </li>
      <li class="panel-item">
        <p class="yesterday">较昨日:<span class="less-danger">{{totalCasesComparesToLastDay}}</span></p>
        <h3 class="number less-danger">{{totalCases}}</h3>
        <p class="title">累计确诊</p>
      </li>
      <li class="panel-item">
        <p class="yesterday">较昨日:<span class="info">{{totalDeathsComparesToLastDay}}</span></p>
        <h3 class="number info">{{totalDeaths}}</h3>
        <p class="title">累计死亡</p>
      </li>
      <li class="panel-item">
        <p class="yesterday">较昨日:<span class="success">{{totalRecoveredComparesToLastDay}}</span></p>
        <h3 class="number success">{{totalRecovered}}</h3>
        <p class="title">累计治愈</p>
      </li>
    </ul>
  </div>
</template>

<script>
import miment from 'miment'

export default {
  name: 'NationalDataPanel',
  props: {
    rawData: Array, // sql获取到的数据
    nowCases: Number, // 现存确诊
    totalCases: Number, // 累计确诊
    totalRecovered: Number, // 累计治愈
    totalDeaths: Number // 累计死亡
  },
  computed: {
    nowCasesComparesToLastDay: function () {
      if (!this.rawData.length) return ''
      const today = this.rawData[0]
      if (today.date === miment().format('YYYY-MM-DD')) {
        // 今日数据
        if (today.cases) {
          return `+${today.cases}`
        } else if (today.recovered) {
          // 如果没有新增确诊但是有新增治愈的 就为负数
          return `-${today.recovered}`
        }
      }
      return '无变化'
    },
    totalCasesComparesToLastDay: function () {
      if (!this.rawData.length) return ''
      const today = this.rawData[0]
      if (today.date === miment().format('YYYY-MM-DD')) {
        // 今日数据
        let result = 0
        if (today.cases) result += today.cases
        if (today.recovered) result -= today.recovered
        if (result > 0) return `+${result}`
        else if (result < 0) return `${result}`
      }
      return '无变化'
    },
    totalDeathsComparesToLastDay: function () {
      if (!this.rawData.length) return ''
      const today = this.rawData[0]
      if (today.date === miment().format('YYYY-MM-DD')) {
        if (today.deaths) return `+${today.deaths}`
      }
      return '无变化'
    },
    totalRecoveredComparesToLastDay: function () {
      if (!this.rawData.length) return ''
      const today = this.rawData[0]
      if (today.date === miment().format('YYYY-MM-DD')) {
        if (today.recovered) return `+${today.recovered}`
      }
      return '无变化'
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~style/common.less';

  .panel-group {
    background: @color-panel;
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 0;

    .panel-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: @color-text;

      .yesterday {
        font-size: 13px;
        font-weight: bold;
      }

      .number {
        margin: 0;
        font-size: 24px;
      }

      .title {
        font-size: 14px;
        font-weight: bold;
      }

      .danger {
        color: @color-danger;
      }

      .less-danger {
        color: @color-less-danger;
      }

      .info {
        color: @color-grey;
      }
      .success {
        color: @color-success;
      }
    }
  }
</style>
