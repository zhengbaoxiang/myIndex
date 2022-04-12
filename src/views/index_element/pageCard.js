let template = `
<div class="pageCard">
    <div class="head_btn" v-if="paramsObj.dataId">
        <label @click="clickEdit($event)" class="edit_btn"></label>
        <label @click="clickDel($event)" class="del_btn" title="删除"></label>
    </div>
    <div class="cardCon">
        <div class="scaling-helper"></div>
        <div
            v-if="paramsObj.dataId"
            class="content"
            @click="openNewTag(paramsObj.url)"
        >
            <!-- <img src="./bgc.jpg" alt="静态路径"/> -->
            <img :src="domPicUrl" alt="动态路径" />
            <!-- <img :src="'' + this.paramsObj.picUrl" alt="拼接写在这不管用"/> -->
            <p class="title">{{ paramsObj.title }}</p>
        </div>
        <div
            v-if="!paramsObj.dataId"
            class="empty content"
            @click="clickEdit($event)"
        ></div>
    </div>
</div>
`
export default {
    template: template,
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
    data() {
        return {
            fileBtnId: String(Math.random()), // 保证每个文件在各自的dom中，不会覆盖
            domPicUrl: '',
            srcPath: './assets/images/backgrounds/' // 相对当前文件index.html的相对路径，当前路径./成功！
        }
    },
    watch: {
        paramsObj: {
            handler(val) {
                this.initial()
            }
        }
    },
    created() {
        this.initial()
    },
    mounted() {},
    activated() {},
    updated() {},
    methods: {
        initial() {
            // 动态路径，webpack中受组件或路由等因素影响,不能直接引用，要require引入，且路径必须是字符串形式
            // this.domPicUrl = require('../../assets/imgs/noHead@2x.png')
            // this.domPicUrl = require('@/assets/imgs/homepage_img3@2x.png')
            if (this.paramsObj.picName) {
                // this.domPicUrl = require('./assets/images/backgrounds/' + this.paramsObj.picName)
                this.domPicUrl = this.srcPath + this.paramsObj.picName
            } else if(this.paramsObj.dataId) {
                // this.domPicUrl = require(`@/assets/images/backgrounds/bg (${this.paramsObj.dataId}).jpg`            )
                this.domPicUrl = this.srcPath + `bg (${this.paramsObj.dataId}).jpg`

            }
        },
        // 把id传出去
        clickEdit(e) {
            this.$emit('editInfo', this.paramsObj)
        },
        clickDel(e) {
            this.$emit('delInfo', this.paramsObj)
        },
        // 打开新窗口
        openNewTag(url) {
            window.open(url, '_blank')
        }
    }
}
