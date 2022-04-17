let template=`
<div class="myIndex" :style="styleObj" >
  <myheader></myheader>
  <pageContain></pageContain>
  <searchArea></searchArea>
  <toolbar @getBgName="getBgName"></toolbar>
  <myfooter></myfooter>
</div>
`
import myheader from './index_element/myHeader.js'
import toolbar from './index_element/toolbar.js'
import searchArea from './index_element/searchArea.js'
import pageContain from './index_element/pageContain.js'
import myfooter from './index_element/myfooter.js'

import { blobToDataURL } from '../libs/util.js'

export default {
  template:template,
  name: 'myIndex',
  components: { myheader, searchArea, toolbar, pageContain, myfooter },
  data () {
    return {
        bgName: 'bg2.gif',
        styleObj: {}
    }
  },
  mounted() {
    this.initial()
  },
  methods: {
    initial() {
        // const url = require('@/assets/images/' + this.bgName)
        let url = window.localStorage.getItem('bgUrl') || ''
        if (url) {
            // console.log('->', url, '<')
            //  js动态控制背景地址
            this.styleObj = {
                color: '#3E4255',
                'background-image': `url(${url})`
            }
        }
    },
    getBgName(file) {
        // console.log('-file>', file, '<')
        blobToDataURL(file, (res) => {
            // console.log('-url>', res, '<')
            const base64Url = res
            this.styleObj = {
                color: '#3E4255',
                'background-image': `url(${base64Url})`
            }
            window.localStorage.setItem('bgUrl', base64Url)
        })
    }
  },
}

