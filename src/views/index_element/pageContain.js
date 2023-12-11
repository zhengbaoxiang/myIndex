let template = `
<section class="main_con">
    <div class="list_zone ">
        <div id="grid" :class="[setLength === 15 ? 'r3' : 'r2']">
            <ol
                class="pageList"
                id="pageList"
                :class="{ active: tabId === 1 }"
            >
                <li v-for="(item, index) in dataList" :key="index">
                    <pageCard
                        :paramsObj="item"
                        @editInfo="editInfo"
                        @delInfo="delInfo"
                        @getPicName="getPicName"
                    ></pageCard>
                </li>
            </ol>
        </div>
    </div>
    <div class="overlay  " v-if="showPopup">
        <div class="popup">
            <input
                type="text"
                name="title"
                v-model="currentData.title"
                autocomplete="off"
                placeholder="标题"
                autofocus
            />
            <input
                type="text"
                name="url"
                v-model="currentData.url"
                autocomplete="off"
                placeholder="网址"
            />
            <button @click="cancel">取消</button>
            <button @click="confirm(currentData)">添加</button>
        </div>
    </div>
</section>
`
import pageCard from './pageCard.js'
export default {
    template: template,
    name: 'pageContain',
    components: { pageCard },
    props: {
        tab_index: {
            default: 0
        }
    },
    data() {
        return {
            tabId: 1,
            dataList: [],
            setLength: 15,
            currentData: {},
            showPopup: false
        }
    },
    created() {
        this.getDataList(`myUrlList_${this.tabId}`)
    },
    mounted() {
        //监听Tom_change事件，同时附带回调函数处理传值
        EVENT_BUS.$on('gridNumChange', this.handleChange)
    },
    activated() {},
    methods: {
        handleChange(par) {
            // console.log('change:参数：',a,b)
            this.getDataList(`myUrlList_${this.tabId}`)
        },
        getDataList(name) {
            //获取布局个数
            let temp = window.localStorage.getItem('gridNum')
            this.setLength = temp ? Number(temp) : this.setLength

            // 从localStorage中读取
            const myUrlListStr = window.localStorage.getItem(name)
            // 读取初始值
            const initialDataList = window.myConfig.initialDataList
            const initialDataListLength = initialDataList.length

            let tempList = [], myUrlList = []

            // 如果本地没有存储过，则使用初始数据
            if (!myUrlListStr) {
                for (
                    let i = 0;
                    i < this.setLength - initialDataListLength;
                    i++
                ) {
                    tempList.push({ id: initialDataListLength + i })
                }
                myUrlList = initialDataList.concat(tempList)
            } else {
                 myUrlList = JSON.parse(myUrlListStr)
            }
            this.dataList = myUrlList.slice(0, this.setLength)
        },
        editInfo(data) {
            // 直接=赋值是浅拷贝，数据会联动
            this.currentData = this.dataAssign(data)
            this.showPopup = true
        },
        cancel() {
            this.currentData = {}
            this.showPopup = false
        },
        confirm(data) {
            console.log(1111,data)

            if (!data.title) {
                console.log('不能为空')
                return
            }
            this.dataList[data.id] = this.dataAssign(data)
            this.showPopup = false
            this.updatePage()
        },
        delInfo(data) {
            // this.dataList[data.id] = { id: data.id }
            // 上一行虽然能改，但是不会刷新数据，$set强制刷新
            this.$set(this.dataList, data.id, { id: data.id })
            this.updatePage()
        },
        getPicName(data, name) {
            // this.dataList[data.id].picName = name
            const item = this.dataAssign(data, name)
            this.$set(this.dataList, data.id, item)
            this.updatePage()
        },
        updatePage() {
            const name = `myUrlList_${this.tabId}`
            const dataListStr = JSON.stringify(this.dataList)
            window.localStorage.setItem(name, dataListStr)
        },
        dataAssign(data, name) {
            let tempObj = {
                id: data.id,
                dataId: data.id + 1,
                url: data.url,
                picName: name || data.picName,
                title: data.title.slice(0,5)
            }
            return tempObj
        }
    }
}
