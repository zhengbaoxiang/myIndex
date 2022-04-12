let template = `
<div class="searchArea">
    <form
        action="http://www.baidu.com/s"
        class="search_form"
        target="_blank"
    >
        <a href="http://www.baidu.com/"></a>
        <input
            type="text"
            name="wd"
            id="input_con"
            placeholder="search"
            :value="inputValue"
            autofocus
            autocomplete="off"
        />
    </form>
</div>
`
export default {
    template: template,
    name: 'searchArea',
    components: {},
    props: {},
    data() {
        return {
            inputValue: ''
        }
    },
    created() {},
    mounted() {},
    activated() {},
    methods: {}
}
