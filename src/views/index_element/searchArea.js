let template=`
<div class="searchArea">
     <form action="http://www.baidu.com/s" class="search_form" target="_blank">
        <a href="http://www.baidu.com/"></a>
        <input type="text" name="wd" id="input_con" placeholder="search" value="" autofocus  autocomplete="off">
        <input type="submit"  id="submit_con" value="百度一下">
    </form>
</div>
`
export default {
  template:template,
  name: 'searchArea',
  components: { },
  props: { },
  data () {
    return {}
  },
  created () {
  },
  mounted () { },
  activated () {},
  methods: { }

}

