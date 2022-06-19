<template>

  <div>


      <button class="register_btn" @click="goBack()">返回主页</button>

<!--    <input class="galleryInfo" id="galleryInfo_pageSize" v-model="public_gallery_index" placeholder="第几页">-->
<!--    <input class="galleryInfo" id="galleryInfo_PageId" v-model="public_gallery_pageSize" placeholder="每页的数量">-->

    <div class="main">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="第几页">
            <el-input v-model="formInline.public_gallery_index" ></el-input>
          </el-form-item>
          <el-form-item label="每页多少张">
            <el-input v-model="formInline.public_gallery_pageSize" ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="get_public_galleryInfo">查询</el-button>
          </el-form-item>
        </el-form>
      </div>



      <div class="info" ><GalleryInfoCom  class="list" v-for="(item,index1) in public_galleryInfo_list" :key="index1" :gallery_description="item"></GalleryInfoCom></div>


    </div>

  </div>

</template>

<script>
import GalleryInfoCom from '../components/GalleryInfo.vue';
import axios from "axios";
export default {

  name: "Public",
  components: {
  GalleryInfoCom
},
  data:function (){
    return{
      formInline: {
        public_gallery_index: 1,
        public_gallery_pageSize: 10
      },
      public_galleryInfo_list:[],
      // public_gallery_index,
      // public_gallery_pageSize,


    }
  },
  methods:{
    get_public_galleryInfo() {
      const url = this.HOST + '/a/album/open';
      const token = localStorage.getItem('token');
      const data = {'index':this.formInline.public_gallery_index,'pageSize':this.formInline.public_gallery_pageSize}
      const options = {
        method: 'POST',
        data: this.qs.stringify(data),
        headers: {'Authorization': token},
        url
      }
      this.public_galleryInfo_list = []
      axios(options).then(res => {
        console.log(res);
        var size = res.data.data.size;
        this.public_galleryInfo_list = []
        for(var i=0;i<size;i++){
          this.public_galleryInfo_list.push(res.data.data.records[i])
        }
      })
    },goBack(){
      this.$router.replace('/Homepage')
    }
  },
  mounted() {
    this.get_public_galleryInfo()
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
  height: 100px;
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
  width: 1000px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 #4E655D;
}
</style>
