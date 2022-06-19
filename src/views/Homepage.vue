<template>
  <div class="background">
  <div class="container">
    <input class="new_gallery" id="gallery_name" v-model="gallery_name" placeholder="请输入新建相册名称">
    <input class="new_gallery" id="gallery_description" v-model="gallery_description" placeholder="请输入相册描述">
    <select v-model="gallery_private">
      <option value="true">私有</option>
      <option value="false">公开</option>
    </select>


    <button class="register_btn" @click="add()">新建相册</button>
    <div class="main">

      <br><br>

      <input class="galleryInfo" id="galleryInfo_PageId" v-model="page_Size" placeholder="每页的数量">
      <input class="galleryInfo" id="galleryInfo_pageSize" v-model="page_Id" placeholder="第几页">

      <button class="register_btn" @click="get_galleryInfo">查询自己的所有相册</button>
      <br>
      <br>
      <!--    <div class="info"><div  v-if="flag_danshu==1"><Studentinfo-com id="1" class="list" v-for="(stu,index1) in new_list_danshu" :key="index1" :card_item="stu" ></Studentinfo-com></div>-->
      <!--    <div v-else-if="flag_shuangshu==1"><Studentinfo-com id="2" class="list" v-for="(stu,index2) in new_list_shuangshu" :key="index2" :card_item="stu"  ></Studentinfo-com></div>-->
      <div class="info" ><GalleryInfoCom  class="list" v-for="(item,index1) in galleryInfo_list" :key="index1" :gallery_description="item"></GalleryInfoCom></div>
    </div>
    <button class="register_btn" @click="goPublic">查看公开相册</button>
    <button class="register_btn" @click="exit_login">退出登陆</button>




<!--    <el-pagination-->
<!--      background-->
<!--      layout="prev, pager, next"-->
<!--      :total=""-->
<!--      :page-size="size"-->

<!--    >-->
<!--    </el-pagination>-->
  </div>


  </div>



</template>


<script>
import GalleryInfoCom from '../components/GalleryInfo.vue';
import axios from "axios";

export default {

  name: "Homepage",

  components: {
    GalleryInfoCom
  },
  data :function () {
    return {
      message: '已登陆',
      name: '',
      page_Id:1,
      page_Size:10,
      gallery_private:true,
      galleryInfo_list:[],
    }
  },


  methods: {
    exit_login() {
      alert("您已退出登录")

      this.$router.push({
          path: '/',
        }
      )
    },
    add: function () {
      if (this.gallery_name == '' || this.gallery_description == '') {
        alert('请输入完整信息');
      } else {

        const url = this.HOST + '/a/album/new';
        const data = {
          'name': this.gallery_name,
          'describe': this.gallery_description,
          'private': this.gallery_private
        };
        const token = localStorage.getItem('token');
        console.log(token)
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/x-www-form-urlencoded', 'Authorization': token},//,'Authorization':localStorage.getItem('token')
          data: this.qs.stringify(data),
          url,
        };

        axios(options).then(res => {
          console.log(res)
        })

      }

    },


    // 现在要想办法去把 所有的相册给读出来

    //接口  /album/open
    get_galleryInfo() {

      const url = this.HOST + '/a/album/my';
      const data = {'index': this.page_Id, 'pageSize': this.page_Size};
      const token = localStorage.getItem('token');
      // console.log(token)
      const options = {
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded', 'Authorization': token},//,'Authorization':localStorage.getItem('token')
        data: this.qs.stringify(data),
        url,
      };

      axios(options).then(res => {
        // const info = JSON.stringify(res.data)

        // console.log(res.data.data.records)
        // console.log(typeof res.data.data.records)  object
        // console.log(typeof res.data.data.index)
        // this.galleryInfo_list.push(info)
        // var galleryInfo_list = new Array();
        var size = res.data.data.size;
        this.galleryInfo_list = []
        for(var i=0;i<size;i++){
          this.galleryInfo_list.push(res.data.data.records[i])
        }

        //var newArr = eval('(' + res.data+ ')');


      })


    },goPublic(){
      this.$router.replace('/public')
    }

  },mounted:function() {
    this.get_galleryInfo()
  }
}
</script>

<style scoped>

.register_btn {
  background-color: #5f8276; /* Green */
  border: none;
  color: #FAFAFA;
  padding: 7px 35px;
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  border-radius: 20px;
  outline: none;
  margin-top: 10px;
}

.register_btn:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  background-color: #0b5137;
  transition: all 0.2s ease-in;
}

.list {

  width: 250px;
  height: 80px;
  padding: 10px;
  background-color: #fff;
  background: linear-gradient(#f8f8f8, #fff);
  box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  margin: 1.5rem;
  margin: 10px;
  display: inline-block;
}

.main {
  position: absolute;
  background-image:url('./img/preview1.jpg');

  width: 1000px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 #4E655D;
}

.el-card {
  min-height: 100px;
  min-width: 300px;
  margin-right: 10px;
  transition: all .5s;
}

.el-card:hover {
  margin-top: -5px;
}
.background{
  width:1570px;
  height: 1000px;
  background-image:url('./img/preview.jpg');
  background-size:cover;
  font-family:sans-serif;
}


</style>
