let template = `
<div class="toolbar" id="toolbar">
    <nav class="nav" v-show="true">
        <label @click="showSetting = !showSetting" class="set_btn"></label>
        <label :for="fileBtnId" class="bgc_btn"></label>
        <input
            type="file"
            style="display:none"
            :id="fileBtnId"
            accept="image/*"
            @change="fileChange($event)"
        />
    </nav>
    <div class="overlay" v-if="showSetting">
        <ul class="popup rel">
            <p class="title">请选择倒计时日期：</p>
            <div class="originDate">
                <input
                    type="date"
                    name="mdate"
                    id="sdate"
                    v-model="selectDate"
                    @change="originChange(selectDate)"
                />
            </div>
            <p class="title">请选择布局方案：</p>
            <li v-for="(item, index) in gridList" :key="index">
                <input
                    type="radio"
                    name="set"
                    :value="item.value"
                    :checked="item.value === curValue"
                    :id="item.value"
                    @click="chooseGridNum(item)"
                />
                <label :for="item.value" style="margin-left:5px">{{
                    item.title
                }}</label>
            </li>
            <div class="bottomZone">
                <button @click="cancel">关闭</button>
                <button @click="resetClick">重置</button>
            </div>
        </ul>
    </div>
</div>

`
export default {
    template: template,
    name: 'toolbar',
    components: {},
    props: {},
    data() {
        return {
            fileBtnId: String(Math.random()), // 保证每个文件在各自的dom中，不会覆盖
            showSetting: false,
            curValue: '15',
            selectDate: window.localStorage.getItem('headDate'),
            gridList: [
                {
                    title: '2x5',
                    value: '10'
                },
                {
                    title: '3x5',
                    value: '15'
                }
            ]
        }
    },
    created() {},
    mounted() {
        this.initial()
    },
    activated() {},
    methods: {
        initial() {
            let temp = window.localStorage.getItem('gridNum')
            this.curValue = temp || this.curValue
        },
        // 选择倒计时日期
        chooseDate(value) {
            // 刷新页面布局
            EVENT_BUS.$emit('headDateChange', value)
        },
        originChange(value){
            console.log('->', value,'<');
            EVENT_BUS.$emit('headDateChange', value)
        },

        chooseGridNum(data) {
            // console.log(data.value)
            this.curValue = data.value
            window.localStorage.setItem('gridNum', data.value)
            // 刷新页面布局
            EVENT_BUS.$emit('gridNumChange', data.value)
            // this.showPopup = false
        },
        fileChange(el) {
            if (!el.target.files[0].size) return
            const file = el.target.files[0]
            // 修改背景 文件名传出去
            // 处理blob文件
            this.$emit('getBgName', file)
        },
        cancel() {
            this.showSetting = false
        },
        resetClick() {
            this.resetConfirm()
        },
        resetConfirm() {
            this.showSetting = false
            // 重置按钮,清掉所有存储数据
            window.localStorage.clear()
            window.location.reload() // 刷新页面，不重复提交页面。
        }
    }
}
