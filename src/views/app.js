let template=`
<div class="myIndex" :style="styleObj" >
  <myheader></myheader>
  <searchArea></searchArea>
  <toolbar @getBgName="getBgName"></toolbar>
  <pageContain></pageContain>
  <myfooter></myfooter>
</div>
`
import myheader from './index_element/myHeader.js'
import toolbar from './index_element/toolbar.js'
import searchArea from './index_element/searchArea.js'
import pageContain from './index_element/pageContain.js'
import myfooter from './index_element/myfooter.js'
export default {
  template:template,
  name: 'myIndex',
  components: { myheader, searchArea, toolbar, pageContain, myfooter },
  props: {
    index: {
      default: 0
    }
  },
  data () {
    return {
      dataList: [],
      bgurl:"./assets/images/",
      bgName:'bg2.gif',
      styleObj:{},
    }
  },
  mounted() {
    this.initial()
  },
  methods: {
    initial(){
      let bg = window.localStorage.getItem('background')
      this.bgName = bg? bg: this.bgName
      this.styleObj = { color:'#3E4255','background-image':`url(${this.bgurl+this.bgName})` }
    },
    getBgName (name) {
      this.styleObj = { color:'#3E4255','background-image':`url(${this.bgurl + name })` }
      //更换背景，存到本地
      window.localStorage.setItem('background', name)
// 
    },
  },
}

