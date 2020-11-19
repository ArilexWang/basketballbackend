<template>
  <div class="home-container">
    <div class="home-content">
      <el-table :data="datas" fit border style="">
        <el-table-column prop="created" label="注册日期" width="120">
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
        :page-size="20"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable semi */
import { getAllMembersCount } from "@/api";

export default {
  name: "other",
  data() {
    return {
      pageCount: 1,
      datas: [],
    };
  },
  created() {
    getAllMembersCount()
      .then((res) => {
        this.$data.pageCount = res.count;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {},
};
</script>

<style>
</style>