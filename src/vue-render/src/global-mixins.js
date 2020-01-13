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
    },
    alert(msg="",title=""){
      return new Promise(resolve => {
        this.$alert(msg,title,{
          dangerouslyUseHTMLString:true,
          closeOnPressEscape:false,
          closeOnClickModal:false
        })
          .then(v => resolve(true))
          .catch(v => resolve(false));
      });
    },
    repeat(count=0,c="\t"){
      return c.repeat(count);
    },
    buildPath(p=""){
      let {isDev,path,process} = window.m;
      let root = window.m.process.cwd();
      if(isDev){
        return path.resolve(root,p);
      }else{
        return path.resolve(root,"resources/app/",p);
      }
    }
  },
  mounted(){
    (window.comps || (window.comps = {}))[this.$options.name || "anonymous"] = this;
  }
}