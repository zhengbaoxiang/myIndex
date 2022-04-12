let template=`
<div class="myHeader">
  <header>
    <div class="header_con">
        <div id="haed_time" v-html="timeStr"></div>
    </div>
  </header>
</div>
`
export default {
  template:template,
  name: 'myHeader',
  components: { },
  props: { },
  data () {
    return {
      timeStr: '',
      initialTime:''
    }
  },
  created () {
    
  },
  mounted () { 
    this.initialTime = window.myConfig.initialTime
    this.fnTimeleft()
    setInterval(this.fnTimeleft, 60000)
  },
  activated () {},
  methods: {
    fnTimeleft () {
      // 实际开发需要通过ajax来读取后台的时间
      var sNow = new Date()
      var sFuture = new Date(this.initialTime).setHours(0, 0, 0)
      // 计算还有多少秒
      var sLeft = parseInt((sFuture - sNow) / 1000)
      // 计算还剩多少天
      var iDays = parseInt(sLeft / 86400)
      // 计算还剩多少小时
      var iHours = parseInt((sLeft % 86400) / 3600)
      // 计算还剩多少分
      var iMinutes = parseInt(((sLeft % 86400) % 3600) / 60)
      // 计算还剩多少秒
      // var iSeconds = sLeft % 60
      var sTr = `距离${this.initialTime}还剩:<strong>${iDays}</strong>天${this.fnTodou(iHours)}时` +
                `${this.fnTodou(iMinutes)}分`
      this.timeStr = sTr
    },
    fnTodou (n) {
      if (n < 10) {
        return '0' + n
      } else {
        return n
      }
    }
  }
}

