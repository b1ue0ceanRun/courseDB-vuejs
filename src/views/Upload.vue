<template>

  <div>
  <el-upload
    class="upload-demo"
    drag
    show-file-list
    action="/api/a/image/upload"
    :headers=token
    :data="data"
    :name="name"
    multiple>
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10M</div>
  </el-upload>
    <button class="register_btn" @click="goBack">返回</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name:'images',
      token:{'Authorization':localStorage.getItem('token')},
      data:{'albumId':this.$route.params.id}


    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    goBack(){
      this.$router.replace(`/content/${this.$route.params.id}`)
    }
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
  width: 1000px;
  height: 700px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 #4E655D;
}

</style>

