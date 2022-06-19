<template>
  <div class="container">
    <div class="main">
        <!-- 整个注册盒子 -->
      <div class="loginbox">
          <!-- 左侧的注册盒子 -->
          <div class="loginbox-in">
          <div class="userbox">
           <span class="iconfont">&#xe817;</span>
           <input  class="user" id="user"  v-model="name" placeholder="用户名">
           </div>
          <br>
          <div class="pwdbox">
            <span class="iconfont">&#xe775;</span>
           <input  class="pwd"  id="password" v-model="pwd" type="password"  placeholder="密码">
           </div>
          <br>
          <div class="pwdbox">
            <span class="iconfont">&#xe775;</span>
           <input  class="email"  id="email"  v-model="email"   placeholder="邮箱">
           </div>

           <br>
           <button type="primary"  class="register_btn" @click="register">Register</button>
     </div>

        <!-- 右侧的注册盒子 -->
         <div class="background">
            <div class="title">Welcome to WH System Management Center</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",

  data:function (){
    return{
      name:'',
      pwd:'',
      email:''
    }
  },
  methods:{

    register(){


      // fetch('http://124.221.237.241:8081/a/user/new', {
      //   method: 'POST',
      //   headers:{
      //     "Content-Type":"application/x-www-form-urlencoded"
      //   },
      //   body:'email='+this.email+'&username='+this.name+'&password='+this.pwd
      // }).then(res => {
      //   console.log(res.data);
      // }).then(
      //
      //   data =>{ //最后要回来改
      //       console.log(JSON.stringify(data))
      //   }
      // )
      // ;
      if(this.name===""||this.email===""||this.pwd===""){
        return alert('请输入完整的信息')
      }
      const url = 'http://124.221.237.241:8081/a/user/new';
      const data = {'email':this.email,
      'username':this.name,
      'password':this.pwd}
      const options = {
        method: 'POST',
        data: this.qs.stringify(data),
        url
      }
      axios(options).then(res => {
        console.log(res);
        if(res.data.msg==='User created success'){
          this.$router.replace('/')
        }else {
          alert(res.data.msg)
        }
      })
    }
  }
}
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
    box-shadow: 0 12px 16px 0  rgba(0,0,0,0.24), 0 17px 50px 0 #4E5365FF;
}
.loginbox-in{
     background-color: #89A1ABFF;
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
    background-image:url('./img/R-C.jpg');
    background-size:cover;
    font-family:sans-serif;
}
.title{
    margin-top:320px;
    font-weight:bold;
    font-size:20px;
    color:#4E655D;

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
    color:#445b53;
    font-weight:bold;
}
 /* input::-webkit-input-placeholder{
    color:#E9E9E9;
 } */
input:focus{
    border-bottom:2px solid #445b53;
    background-color:transparent;
     transition: all 0.2s ease-in;
     font-family:sans-serif;
    font-size:15px;
     color:#445b53;
     font-weight:bold;

}
input:hover{
    border-bottom:2px solid #445b53;
    background-color:transparent;
     transition: all 0.2s ease-in;
     font-family:sans-serif;
    font-size:15px;
     color:#445b53;
     font-weight:bold;

}

input:-webkit-autofill {
 box-shadow: 0 0 0px 1000px  #89AB9E inset !important;
 -webkit-text-fill-color: #445b53;

}

input:-webkit-autofill::first-line {
 font-size: 15px;
 font-weight:bold;
 }
.log-box{
    font-size:12px;
    display: flex;
    justify-content: space-between ;
    width:174px;
    margin-left:30px;
    color:#4E655D;
    margin-top:-5px;
    align-items: center;

}
.log-box-text{
    color:#4E655D;
    font-size:12px;
      text-decoration:underline;
    }
.register_btn{
    background-color: #5f8276; /* Green */
    border: none;
    color: #FAFAFA;
    padding: 7px 35px;
    text-align: center;
    text-decoration: none;
    font-size: 13px;
    border-radius: 20px;
    outline:none;
}
.register_btn:hover{
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    cursor: pointer;
     background-color: #0b5137;
    transition: all 0.2s ease-in;
}

.warn{
    margin-top:60px;
    margin-right:110px;
    margin-bottom: 5px;
    font-weight:bold;
    font-size:17px;
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
    color: #64654EFF;
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
