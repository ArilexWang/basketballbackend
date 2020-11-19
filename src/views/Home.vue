<template>
  <div class="home-container">
    <div class="home-content">
      <el-table :data="datas" fit border style="">
        <el-table-column prop="name" label="名称" width="120">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="120">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.price"
              placeholder="请输入内容"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="locked" label="锁场" width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.locked"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" size="mini"
              >保存</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable semi */
import { getAllCourts, updateCourt } from "@/api";

export default {
  name: "home",
  data() {
    return {
      datas: [],
    };
  },
  created() {
    getAllCourts().then((res) => {
      const courts = [];
      res.data.forEach((element) => {
        const court = JSON.parse(element);
        courts.push(court);
      });
      this.$data.datas = courts;
    });
  },
  methods: {
    handleEdit(info) {
      this.$confirm("是否提交修改", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(info);
          updateCourt(info).then((res) => {
            console.log(res);
            if (res.errcode == 0) {
              this.$message({
                type: "success",
                message: "已保存!",
              });
            } else {
              this.$message({
                type: "fail",
                message: "保存失败!",
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.home-container {
  padding: 10px;
  padding-top: 5px;
}
.home-content {
  padding: 10px;
  border-radius: 5px;
  background: #fff;
}
</style>