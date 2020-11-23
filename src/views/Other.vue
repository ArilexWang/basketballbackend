<template>
  <div class="home-container">
    <div class="home-content">
      <el-table :data="datas" height="550" fit border style="">
        <el-table-column prop="created" label="注册日期" width="180">
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" width="120">
        </el-table-column>
        <el-table-column prop="phoneNum" label="电话号码" width="200">
        </el-table-column>
        <el-table-column prop="validTimes" label="次卡" width="120">
        </el-table-column>
        <el-table-column prop="validTime" label="时间卡" width="120">
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="pageCount"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable semi */
import { getCollectionCount, getCollectionsByPage } from "@/api";

export default {
  name: "other",
  data() {
    return {
      pageCount: 0,
      currentPage: 1,
      pageSize: 20,
      datas: [],
    };
  },
  created() {
    getCollectionCount("members")
      .then((res) => {
        console.log(res);
        this.$data.pageCount = res.total;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    this.getCollection(this.$data.currentPage, this.$data.pageSize).then(
      (res) => {
        this.$data.datas = res;
      }
    );
  },
  methods: {
    handleCurrentChange(val) {
      this.getCollection(val, this.$data.pageSize).then((res) => {
        this.$data.datas = res;
      });
    },
    getCollection(currentPage, pageSize) {
      return new Promise((resolve, reject) => {
        const offset = (currentPage - 1) * pageSize;
        getCollectionsByPage("members", offset, pageSize)
          .then((res) => {
            res.data.forEach((element) => {
              element.created = this.$dateFormat(
                element.created,
                "yyyy-mm-dd HH:MM"
              );
            });
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
</script>

<style>
</style>