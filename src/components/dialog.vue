<template>
  <el-dialog  title="评论"
              :visible.sync=dialogTableVisible>
    <el-table :data="comments_data">
      <el-table-column property="userId" label="用户" width="200"></el-table-column>
      <el-table-column property="message" label="评论"></el-table-column>
    </el-table>
  </el-dialog>

</template>

<script>
export default {
  name: "dialog",
  props:{
    comments_data:'',
    dialogTableVisible:''
  },
  data(){
    return{
      dialogTableVisible:false
    }

  }

}
</script>

<style scoped>

</style>
