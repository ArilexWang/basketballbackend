<template>
  <div class="home-container">
    <div class="home-content">
      <el-table :data="datas" height="550" fit border style="">
        <el-table-column prop="created" label="下单时间" width="150">
        </el-table-column>
        <el-table-column prop="orderDate" label="订单时间" width="150">
        </el-table-column>
        <el-table-column prop="courts" label="场地" width="180">
        </el-table-column>
        <el-table-column prop="userInfo.nickName" label="用户昵称" width="120">
        </el-table-column>
        <el-table-column
          prop="userInfo.phoneNum"
          label="用户联系方式"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="hasRefund" label="退款" width="120">
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
      collection: "courtOrders",
    };
  },
  created() {
    getCollectionCount(this.$data.collection)
      .then((res) => {
        console.log(res);
        this.$data.pageCount = res.count;
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
        getCollectionsByPage(this.$data.collection, offset, pageSize)
          .then((res) => {
            const members = [];
            res.data.forEach((element) => {
              const member = JSON.parse(element);
              const date = new Date(member.created.$date);
              const orderDate = new Date(member.orderDate.$date);
              member.created = this.$dateFormat(date, "yyyy-mm-dd HH:MM");
              member.courts = this.formatOrderCourts(member.courts);
              member.hasRefund = member.hasRefund ? "已退款" : "未退款";
              member.orderDate = this.$dateFormat(
                orderDate,
                "yyyy-mm-dd HH:MM"
              );
              members.push(member);
            });
            resolve(members);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    formatOrderCourts(courts) {
      const formatCourts = [];
      let courtsStr = "";
      courts.forEach((court) => {
        const formatCourt = court.toString() + "号场，";
        formatCourts.push(formatCourt);
        courtsStr += formatCourt;
      });
      courtsStr = courtsStr.substr(0, courtsStr.length - 1);
      return courtsStr;
    },
  },
};
</script>

<style>
</style>