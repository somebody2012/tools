export default {
  methods:{
    success(data,msg){
      return {
        isSuccess:true,
        msg:msg || "",
        data:data || {}
      }
    },
    fail(data,msg){
      return {
        isSuccess:false,
        msg:msg || "",
        data:data || {}
      }
    }
  },
  mounted(){
    (window.comps || (window.comps = {}))[this.$options.name || "anonymous"] = this;
  }
}