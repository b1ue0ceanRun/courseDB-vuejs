<template>
  <div class="background">
    <button class="register_btn" @click="goUpload">上传图片</button>
    <div class="main">
      <input v-model="pageId" placeholder="请输入想要查看第几页">
      <input v-model="pageSize" placeholder="请输入查看每页的数量">
      <button class="register_btn" @click="getImages">查看图片</button>
      <br>
      <br>
      <br>
      <el-carousel interval="4000" type="card" height="500px" margin-top="20px" >
        <el-carousel-item v-for="item in imagesUrl" :key="item" >

          <input v-model="textarea" style="width: 350px;height: 30px" placeholder="请输入内容"></input>




          <el-button size="small" type="primary"  @click="giveCom(item.iid)">评论</el-button>
          <el-button  type="danger" icon="el-icon-delete" circle @click="deleteImage(item.iid)"></el-button>

<!--          <el-button  type="danger" circle @click="getComments(item.iid)">查看评论</el-button>-->
          <el-badge  class="item">
            <el-button  size="small" type="primary" icon="el-icon-chat-dot-square" @click="getComments(item.iid);item.isShow=true;"  circle></el-button>
            <DialogCom @
              :comments_data="comments_data"
            :dialog-table-visible="item.isShow"
            >


            </DialogCom>
<!--            <el-dialog  title="评论" :visible="dialogTableVisible">-->
<!--              <el-table :data="comments_data">-->
<!--                <el-table-column property="userId" label="用户" width="200"></el-table-column>-->
<!--                <el-table-column property="message" label="评论"></el-table-column>-->
<!--              </el-table>-->
<!--            </el-dialog>-->
          </el-badge>



          <img :src="item.url"/>

        </el-carousel-item>
      </el-carousel>


    </div>
    <button class="register_btn" @click="goBack">返回主页</button>
    <button class="register_btn" @click="goPublic">返回公开页面</button>
  </div>
</template>

<script>
import axios from "axios";
import DialogCom from '../components/dialog'

export default {
  name: "Content",
  components: {
    DialogCom
  },
  data: function () {
    return {


      commentForm:{
        commentContent:''
      },
      textarea: 'np',
      galleryId: this.$route.params.id,
      pageId: 1,
      pageSize: 10,
      commentsIndex: 1,
      commentsSize: 10,
      imagesUrl: [],
      comments_data: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px'


    }
  },
  created: function () {
    setInterval(this.timer, 10);
  },


  methods: {
    getImages() {


      const url = this.HOST + '/a/album/images';
      //index pageSize
      const data = {'albumId': this.galleryId, 'index': this.pageId, 'pageSize': this.pageSize}
      const token = localStorage.getItem('token');
      console.log(token)
      const options = {
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded', 'Authorization': token},//,'Authorization':localStorage.getItem('token')
        data: this.qs.stringify(data),
        url,
      };
      this.imagesUrl = []

      axios(options).then(res => {
          for (var i = 0; i < this.pageSize; i++) {
            this.imagesUrl.push({'url': new URL(res.data.data.records[i].url), 'iid': res.data.data.records[i].iid,'isShow':false})
          }
          console.log(res.data.data.records[0])
        }
      )
    },
    goUpload() {
      this.$router.replace(`/upload/${this.$route.params.id}`)
    }, goBack() {
      this.$router.replace(`/Homepage`)
    }, deleteImage(iid) {

      const url = this.HOST + '/a/image/delete';
      const data = {
        'albumId': this.$route.params.id,
        'iids': iid,
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

      alert("删除成功")

    },goPublic() {
      this.$router.replace('/public')
    },getComments(iid){

      // [{message: "np", userId: 73, id: 7}]
      const url = this.HOST + '/a/image/getsay';
      const data = {
        'index': this.commentsIndex ,
        'pageSize':this.commentsSize,
        'iid': iid,
      };
      this.comments_data = [];
      const token = localStorage.getItem('token');
      console.log(token)
      const options = {
        method: 'POST',
        headers: {'Authorization': token},//,'Authorization':localStorage.getItem('token')
        data: this.qs.stringify(data),
        url,
      };

      axios(options).then(res => {
        console.log(res)
        var size = res.data.data.size;
        for(var i=0;i<size;i++){
          this.comments_data.push(res.data.data.records[i])
        }

      })


    },giveCom(iid){
      const url = this.HOST + '/a/image/say';
      const data = {
        'message': this.textarea ,
        'iid': iid,
      };
      const token = localStorage.getItem('token');
      const options = {
        method: 'POST',
        headers: {'Authorization': token},//,'Authorization':localStorage.getItem('token')
        data: this.qs.stringify(data),
        url,
      };

      axios(options).then(res => {
        console.log(res)})

    },
  },
  mounted() {
    this.getImages()
  },
  timer: function (){
    this.getImages()
  }


};
</script>


<style scoped>
.register_btn {
  background-color: #4e5b65; /* Green */
  border: none;
  color: rgba(250, 250, 250, 0.56);
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
  background-color: #0b4751;
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
  width:1200px;
  position: absolute;
  height: 650px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 #4e5565;
}

.el-carousel__item h3 {
  color: white ;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #4e5565;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #4e5f65;
}

img {
  /*设置图片宽度和浏览器宽度一致*/
  margin-top: 20px;
  width: 100%;
  height: 500px;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.background{
  width:1500px;
  height: 1020px;
  background-size:cover;
  font-family:sans-serif;
}
</style>


//改文件目的为取出对应相册中所有的图片
