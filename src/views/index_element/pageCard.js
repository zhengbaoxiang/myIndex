let template=`
<div class="pageCard">
    <div class="head_btn" v-if="paramsObj.dataId">
        <label @click="clickEdit($event)" class="edit_btn"></label>
        <label :for="fileBtnId"           class="bgc_btn"></label>
        <input type="file"  style="display:none"  :id='fileBtnId'
            accept="image/*" @change="fileChange($event)"   />
        <label @click="clickDel($event)" class="del_btn"></label>
    </div>
    <div @click="openNewTag(paramsObj.url)" class="content" v-if="paramsObj.dataId" >
        <!--<img src="./assets/images/backgrounds/bg (2).jpg" alt="静态路径"/> -->
         <img :src="domPicUrl" alt="动态路径"/>
        <p class="title">{{paramsObj.title}}</p>
    </div>

    <div @click="clickEdit($event)"  class="empty content" v-if="!paramsObj.dataId">
    </div>
</div>
`
export default {
  template:template,
  name: 'pageCard',
  props: {
    paramsObj: {
      default: function () {
        return {
          id: 9,
          dataId: 9,
          url: 'https://www.baidu.com',
          picName: 'background.jpeg',
          title: '标题'
        }
      }
    }
  },
  data () {
    return {
      fileBtnId: String(Math.random()), // 保证每个文件在各自的dom中，不会覆盖
      domPicUrl: "./assets/images/backgrounds/bg (2).jpg",
      srcPath: './assets/images/backgrounds/' // 相对当前文件index.html的相对路径，当前路径./成功！
    }
  },
  watch: {
    paramsObj: {
      handler (val) {
        this.initial()
      }
    }

  },
  created () {
    this.initial()
  },
  mounted () { },
  activated () {},
  updated () {
  },
  methods: {
    initial () {
      // 动态路径，webpack中受组件或路由等因素影响,不能直接引用，要require引入，且路径必须是字符串形式
      // this.domPicUrl = require('../../assets/imgs/noHead@2x.png')
      // this.domPicUrl = require('@/assets/imgs/homepage_img3@2x.png')
      if (this.paramsObj.picName) {
        // this.domPicUrl = require('./assets/images/backgrounds/' + this.paramsObj.picName)
        this.domPicUrl = this.srcPath + this.paramsObj.picName
        
      } else {
        // this.domPicUrl = require('./assets/images/background.jpeg')
        this.domPicUrl = './assets/images/background.jpeg'
        
      }
    },
    // 把id传出去
    clickEdit (e) {
      this.$emit('editInfo', this.paramsObj)
    },
    clickDel (e) {
      this.$emit('delInfo', this.paramsObj)
    },
    fileChange (el) {
      if (!el.target.files[0].size) return
      const files = el.target.files
      const fileName = files[0].name
      // el.target.value = ''
      // 修改背景 文件名传出去
      console.log(el, fileName)
      // this.domPicUrl = require('./' + fileName) //当前路径可以切换
      // this.domPicUrl = require('@/assets/images/backgrounds/' + fileName)
      this.$emit('getPicName', this.paramsObj, fileName)
    },
    // 没有后台服务的情况，上传保存图片背景比较困难，暂时搁置，使用本地图片
    Upload () {
      console.log('todo')
    },
    // 打开新窗口
    openNewTag (url) {
      console.log(url)
      window.open(url, '_blank')
    }
  }
}

