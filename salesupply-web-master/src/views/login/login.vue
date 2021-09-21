<template>
  <div>
    <form>
      用户名: <input type="text" v-model="user.userName"> <br>
      密码: <input type="text" v-model="user.pwd"> <br>
      <input type="submit" value="登录" @click="login()"> <br>
    </form>
  </div>
</template>

<script>
import instance from "../../utils/request";

export default {
  name: "Login",
  data(){
    return{
      user:{},
    }
  },
  methods:{
    login(){
      //console.log(this.admin);
      // 传到后端的数据为JSON数据格式
      //password: "123"
      //username: "123"
      //发送axios请求,登录成功
      // this.$router.push({name:'Index'});

      instance.post("/user/login",this.user).then(res=>{
        // console.log(res.data);
        //console.log("返回的结果："+res);
        console.log(res);

        // const result = res.data;
        // if (result.success){
        //   //前端存储token信息
        //   localStorage.setItem("token",result.token);
        //   //切换路由到主页
        this.$router.push({name:'Main'});
        // }else {
        //   alert(result.msg);
        // }
      });

    },
  },
}
</script>

<style scoped>

</style>