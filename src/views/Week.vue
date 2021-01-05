<template>
  <div class="home-container">
    <div class="home-content">
      <el-row type="flex" align="middle">
        <el-col :span="8">
          <el-select
            v-model="selectedValue"
            placeholder="请选择"
            @change="selectChanged"
          >
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
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
  name: "week",
  data() {
    return {
      data: {},
      datas: [],
      newData: [{}],
      collection: "week",
      selectOptions: [
        { value: "0", label: "星期日" },
        { value: "1", label: "星期一" },
        { value: "2", label: "星期二" },
        { value: "3", label: "星期三" },
        { value: "4", label: "星期四" },
        { value: "5", label: "星期五" },
        { value: "6", label: "星期六" },
      ],
      selectedValue: "0",
    };
  },
  created() {
    getDataWithId(this.$data.collection, this.$data.selectedValue).then(
      (res) => {
        console.log(res);
        this.$data.data = res.data[0];
      }
    );
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
        // deleteInfo(info, this.$data.collection).then(() => {
        //   this.$router.go(0);
        // });
      });
    },
    handleAdd() {
      this.$data.data.period.push({});
    },
    selectChanged(value) {
      console.log(value, this.$data.selectOptions[value]);
      getDataWithId(this.$data.collection, this.$data.selectedValue).then(
        (res) => {
          console.log(res);
          this.$data.data = res.data[0];
        }
      );
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