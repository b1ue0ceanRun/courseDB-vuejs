<template>

  <!--    <div>相册名：{{ gallery_description.name}} </div>-->
  <!--    <div>描述：{{gallery_description.describe}}</div>-->
  <!--    <br>-->
  <!--    <button  @click="trunGalleryContent">查看相册</button>-->
  <el-card @click="trunGalleryContent" class="box-card">
<!--    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"  height="30" width="30">-->
    <div slot="header" class="clearfix">
      <span>{{'相册名:'+gallery_description.name}}</span>
      <span>{{'相册所有人:'+gallery_description.owner}}</span>
      <div>
        <el-button @click="trunGalleryContent" style="float: right; padding: 3px 0" type="text"  icon="el-icon-folder-opened"></el-button>

        <el-button @click="dialogFormVisible = true" style="float: right; padding: 3px 0" type="text" icon="el-icon-edit-outline"></el-button>
        <el-button @click="deleteGallery" style="float: right; padding: 3px 0" type="text" icon="el-icon-delete" ></el-button>
        <el-dialog title="更改相册信息" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="相册名" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="描述" :label-width="formLabelWidth">
              <el-input v-model="form.describe" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否公开" :label-width="formLabelWidth">

              <el-select v-model="form.private" placeholder="否">
                <el-option label="是" value="false"></el-option>
                <el-option label="否" value="true"></el-option>
              </el-select>
            </el-form-item>


          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateGalleryInfo">确 定</el-button>
          </div>
        </el-dialog>

      </div>
    </div>
    <div v-for="o in 1" :key="o" class="text item">
      {{ gallery_description.describe }}
    </div>



  </el-card>

  <!--  <el-dialog title="收货地址" :visible.sync="deleteGallery">-->
  <!--    <el-form :model="form">-->
  <!--      <el-form-item label="活动名称" :label-width="formLabelWidth">-->
  <!--        <el-input v-model="form.name" autocomplete="off"></el-input>-->
  <!--      </el-form-item>-->
  <!--      <el-form-item label="活动区域" :label-width="formLabelWidth">-->
  <!--        <el-select v-model="form.region" placeholder="请选择活动区域">-->
  <!--          <el-option label="区域一" value="shanghai"></el-option>-->
  <!--          <el-option label="区域二" value="beijing"></el-option>-->
  <!--        </el-select>-->
  <!--      </el-form-item>-->
  <!--    </el-form>-->
  <!--    <div slot="footer" class="dialog-footer">-->
  <!--      <el-button @click="deleteGallery = false">取 消</el-button>-->
  <!--      <el-button type="primary" @click="deleteGallery = false">确 定</el-button>-->
  <!--    </div>-->
  <!--  </el-dialog>-->

  <!--  <el-row>-->
  <!--    <el-col :span="2" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">-->
  <!--      <el-card :body-style="{ padding: '6px' }">-->
  <!--        <img src="etail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=189152638%2C135124566&os=4135202446%2C1889421805&simid=189152638%2C135124566&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=0&oriquery=%E7%BE%8E%E4%B8%BD%E7%9A%84%E5%A5%B3%E7%94%9F&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2Ftx28%2F290421183932733.jpg%26refer%3Dhttp%3A%2F%2Flmg.jj20.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Dauto%3Fsec%3D1658067110%26t%3D547cebacbefc164200b437e2545acb17&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B33da_z%26e3Bv54AzdH3FpxAzdH3Fg7fijg2AzdH3Fndm8cn_z%26e3Bip4s&gsm=4&islist=&querylist=&dyTabStr=MCwyLDMsMSw2LDQsNSw3LDgsOQ%3D%3D" class="image">-->
  <!--        <div style="padding: 14px;">-->
  <!--          <span>好吃的汉堡</span>-->
  <!--          <div class="bottom clearfix">-->

  <!--            <el-button type="text" class="button">操作按钮</el-button>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </el-card>-->
  <!--    </el-col>-->
  <!--  </el-row>-->
</template>
<script>
import axios from "axios";

export default {
  name: "GalleryInfo",
  props: ["gallery_description"],
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        describe: '',
        private: false,
      },
      formLabelWidth: '120px'
    };
  },


  methods: {
    trunGalleryContent() {
      this.$router.replace(`/content/${this.gallery_description.id}`)
    }, deleteGallery() {
      const url = this.HOST + '/a/album/delete';
      const token = localStorage.getItem('token');
      const options = {
        method: 'POST',
        data: this.qs.stringify({'albumId': this.gallery_description.id}),
        headers: {'Authorization': token},
        url
      }
      axios(options).then(res => {
        console.log(res)
      })
      alert('删除成功')
    },
    updateGalleryInfo() {
      const url = this.HOST + '/a/album/update';
      const token = localStorage.getItem('token');
      const data = {
        'albumId': this.gallery_description.id,
        'name': this.form.name,
        'describe': this.form.describe,
        'private': this.form.private
      }
      const options = {
        method: 'POST',
        data: this.qs.stringify(data),
        headers: {'Authorization': token},
        url
      }
      axios(options).then(res => {
        console.log(res)
      })
      this.dialogFormVisible = false;

    }
  }

}


</script>

<style>
.el-card {
  min-height: 100px;
  min-width: 300px;
  margin-right: 10px;
  transition: all .5s;
}

.el-card:hover {
  margin-top: -5px;
}


</style>
