<template>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>

</template>

<script>

export default {
  name: "pagination",
  data :function () {
    return {
      galleryId:this.$route.params.id,
      pageId:'',
      pageSize:''

    }
  },


  methods:{
    getImages(){

      const url = this.HOST + '/album/images';
      //index pageSize
      const data = {'albumId':this.galleryId,'index':this.pageId,'pageSize':this.pageSize}
      this.$axios.post(url,data).then(res=>{console.log(res.data)})
    }
  }

};
</script>

<style>
</style>
