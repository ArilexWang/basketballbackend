<template>
  <div class="home-container">
    <div class="home-content">
      <el-row type="flex" align="middle">
        <el-col :span="8">{{ title }}</el-col>
        <el-col :span="8">
          <el-button size="mini" @click="handleAdd">新增时间段</el-button>
        </el-col>
        <el-col :span="8">
          <el-button size="mini" @click="handleUpdate">保存</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="data.period"
        :default-sort="{ prop: 'startHour' }"
        height="450"
        border
        style="margin-top: 10px"
      >
        <el-table-column prop="name" label="开始时" width="120">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.startHour"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="开始分" width="120">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.startMinute"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="结束时" width="120">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.endHour"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="结束分" width="120">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.endMinute"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="半场价格" width="120">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.halfPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="全场价格" width="120">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.fullPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              @click="handleDelete(scope.$index)"
              size="mini"
              type="danger"
              >删除</el-button
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
/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
import { getDataWithId, updateInfo } from "@/api";

export default {
  name: "home",
  data() {
    return {
      data: {},
      title: "",
      datas: [],
      newData: [{}],
      collection: "week",
    };
  },
  created() {
    getDataWithId(this.$data.collection, "2").then((res) => {
      console.log(res);
      this.$data.data = res.data[0];
      const arr = ["日", "一", "二", "三", "四", "五", "六"];
      const str = "星期" + arr[parseInt(this.$data.data._id)];
      this.$data.title = str;
    });
  },
  methods: {
    handleUpdate() {
      this.$confirm("是否提交修改", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$data.data.period.forEach((element) => {
            element.startHour = parseInt(element.startHour);
            element.endHour = parseInt(element.endHour);
            element.halfPrice = parseInt(element.halfPrice);
            element.fullPrice = parseInt(element.fullPrice);
            element.startMinute = parseInt(element.startMinute);
            element.endMinute = parseInt(element.endMinute);
          });
          this.$data.data.period.sort((a, b) => a.startHour - b.startHour);
          updateInfo(this.$data.data, this.$data.collection).then((res) => {
            console.log(res);
            if (res.updated == 1) {
              this.$message({
                type: "success",
                message: "已保存!",
              });
              // this.$router.go(0);
            } else {
              // this.$router.go(0);
              this.$message({
                type: "fail",
                message: "保存失败!",
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
          this.$router.go(0);
          this.$message({
            type: "info",
            message: "保存失败",
          });
        });
    },
    handleDelete(index) {
      this.$confirm("是否删除当前时间段", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log(index);
        this.$data.data.period.splice(index, 1);
        console.log(this.$data.data);
      });
    },
    handleAdd() {
      this.$data.data.period.push({});
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