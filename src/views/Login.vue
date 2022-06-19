<template>
  <div class="container">
    <div class="main">
        <!-- 整个注册盒子 -->
      <div class="loginbox">
          <!-- 左侧的注册盒子 -->
          <div class="loginbox-in">
          <div class="userbox">
           <span class="iconfont">&#xe817;</span>
           <input  class="user" id="user"   v-model="name" placeholder="用户名">
           </div>
          <br>
          <div class="pwdbox">
            <span class="iconfont">&#xe775;</span>
           <input  class="pwd" id ="password" type="password"  v-model="pwd" placeholder="密码">
           </div>
          <br>
          <div class="log-box">
            <div class="log-box-text"> 忘记密码</div>
           <button type="primary"  class="login_btn" @click="login">Login</button>
           </div>

           <br>
           <div class="warn">@b1ue0cean</div>
           <button type="primary"  class="register_btn" @click="register">若无账号请点击注册</button>
     </div>

        <!-- 右侧的注册盒子 -->
         <div class="background">
            <div class="title">Welcome to b1ue0cean's photo gallery</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  methods: {

    register() {
      this.$router.push("Register")
    },

    data:function (){
      return{
        name:'',
        pwd:''
      }
    },

    login() {
      //想办法去登
      //根据api接口获取token


        // console.log(error)
      const url = 'http://124.221.237.241:8081/a/user/token';
      const data = {'username':this.name,'password':this.pwd};
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: this.qs.stringify(data),
        url,
      };

      axios(options).then(res=>{


        this.userToken = res.data.data
        localStorage.setItem('token',this.userToken)
        if (res.data.msg === 'Login success'){
          this.$router.push({name:'Homepage'})
        }else{
          alert(res.data.msg);
        }
      })
    }


  }}

</script>

<style scoped>

.loginbox{
    display:flex;
    position:absolute;
    width:800px;
    height:400px;
    top:40%;
    left:50%;
    transform:translate(-50%,-50%);
    box-shadow: 0 12px 16px 0  rgba(0,0,0,0.24), 0 17px 50px 0 #63654EFF;
}
.loginbox-in{
     background-color:#63654EFF;
     width:240px;
}
.userbox{
    margin-top:120px ;
    height:30px;
     width:230px;
     display: flex;
     margin-left:25px;
}
.pwdbox{
    height:30px;
    width:225px;
    display: flex;
    margin-left:25px;
}

.background{
    width:570px;
    background-image:url('./img/lalala.jpg');
    background-size:cover;
    font-family:sans-serif;
}
.title{
    margin-top:320px;
    font-weight:bold;
    font-size:20px;
    color:#63654EFF;

}
.title:hover{
     font-size:21px;
     transition: all 0.4s ease-in-out;
     cursor: pointer;
}
.uesr-text{
     position:left;
}
input{
    outline-style: none ;
    border: 0;
    border-bottom:1px solid #E9E9E9;
    background-color:transparent;
    height:20px;
     font-family:sans-serif;
    font-size:15px;
    color: #5b4b44;
    font-weight:bold;
}
 /* input::-webkit-input-placeholder{
    color:#E9E9E9;
 } */
input:focus{
    border-bottom:2px solid #5A5B44FF;
    background-color:transparent;
     transition: all 0.2s ease-in;
     font-family:sans-serif;
    font-size:15px;
     color:#5A5B44FF;
     font-weight:bold;

}
input:hover{
    border-bottom:2px solid #5A5B44FF;
    background-color:transparent;
     transition: all 0.2s ease-in;
     font-family:sans-serif;
    font-size:15px;
     color:#445b53;
     font-weight:bold;

}

input:-webkit-autofill {
  /* 修改默认背景框的颜色 */
 box-shadow: 0 0 0px 1000px #AAAB89FF inset !important;
 /* 修改默认字体的颜色 */
 -webkit-text-fill-color: #AAAB89FF;
}

input:-webkit-autofill::first-line {
  /* 修改默认字体的大小 */
 font-size: 15px;
 /* 修改默认字体的样式 */
 font-weight:bold;
 }
.log-box{
    font-size:12px;
    display: flex;
    justify-content: space-between ;
    width:190px;
    margin-left:30px;
    color:#AAAB89FF;
    margin-top:-5px;
    align-items: center;

}
.log-box-text{
    color:#AAAB89FF;
    font-size:12px;
      text-decoration:underline;
    }
.login_btn{
    background-color: #AAAB89FF; /* Green */
    border: none;
    color: #FAFAFA;
    padding: 5px 22px;
    text-align: center;
    text-decoration: none;
    font-size: 13px;
    border-radius: 20px;
    outline:none;
}
.login_btn:hover{
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    cursor: pointer;
     background-color: #AAAB89FF;
      transition: all 0.2s ease-in;
}

.warn{
    margin-top:60px;
    /* margin-right:120px; */
    margin-left:-120px;
    margin-bottom: 5px;
     font-weight:bold;
    font-size:17px;
}

.register_btn{
    background-color: transparent; /* Green */
    border: none;
    text-decoration: none;
    font-size: 12px;
    /* border-radius: 20px;   */
     color: #AAAB89FF;
    font-size:12px;
    text-decoration:underline;
    display: flex;
    margin-left:25px;
    outline:none;

}
.register_btn:hover{
    font-weight:bold;
    cursor: pointer;
}
@font-face {
    font-family: "iconfont";
    src: url('./font/iconfont.eot');
    src: url('./font/iconfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('./font/iconfont.woff2') format('woff2'), url('./font/iconfont.woff') format('woff'), url('./font/iconfont.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
    url('./font/iconfont.svg#iconfont') format('svg');
}

.iconfont {
    font-family: "iconfont" !important;
    font-size: 20px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height:22px;
    color: #63654e;
    margin-right:10px;
    margin-top:3px;
}

.icon-key:before {
    content: "\e775";
}

.icon-account:before {
    content: "\e817";
}





</style>
