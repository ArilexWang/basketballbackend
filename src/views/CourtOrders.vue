
<template>
  <div class="home-container">
    <div class="home-content">
      <el-table :data="datas" height="550" fit border style="">
        <el-table-column prop="createdFormat" label="下单时间" width="150">
        </el-table-column>
        <el-table-column prop="_id" label="业务订单号" width="130">
        </el-table-column>
        <el-table-column
          prop="payMsg.transactionId"
          label="支付订单号"
          width="150"
        >
        </el-table-column>
        <el-table-column prop="orderDateFormat" label="场地时间" width="200">
        </el-table-column>
        <el-table-column prop="courtsFormat" label="场地" width="150">
        </el-table-column>
        <el-table-column prop="userInfo.nickName" label="用户昵称" width="120">
        </el-table-column>
        <el-table-column
          prop="userInfo.phoneNum"
          label="用户联系方式"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="hasRefundFormat" label="退款" width="120">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              @click="handleDelete(scope.row)"
              size="mini"
              type="danger"
              >删除</el-button
            >
          </template>
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
/* eslint-disable operator-linebreak */
/* eslint-disable operator-linebreak */
import {
  getCollectionCountWithParam,
  getCollectionsByPageWithParam,
  deleteInfo,
} from "@/api";

export default {
  name: "other",
  data() {
    return {
      pageCount: 0,
      currentPage: 1,
      pageSize: 20,
      datas: [],
      newData: {},
      collection: "courtOrders",
    };
  },
  created() {
    getCollectionCountWithParam(this.$data.collection, { isVIP: false })
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
        res.sort((a, b) => b.created - a.created);
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
        getCollectionsByPageWithParam(this.$data.collection, offset, pageSize, {
          isVIP: false,
        })
          .then((res) => {
            res.data.forEach((element) => {
              element.createdFormat = this.$dateFormat(
                element.created,
                "yyyy-mm-dd HH:MM"
              );
              element.courtsFormat = this.formatOrderCourts(
                element.orderMsg.courts
              );
              element.hasRefundFormat = element.hasRefund ? "已退款" : "未退款";
              element.orderDateFormat =
                this.$dateFormat(element.orderMsg.start, "yyyy-mm-dd HH:MM") +
                " - " +
                this.$dateFormat(element.orderMsg.end, "HH:MM");
            });
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    formatOrderCourts(courts) {
      let courtsStr = "";
      courts.forEach((court) => {
        courtsStr += court.name + " ,";
      });
      courtsStr = courtsStr.substr(0, courtsStr.length - 1);
      return courtsStr;
    },
    handleDelete(info) {
      this.$confirm("删除当前订单信息前请确认是否完成退款操作", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log(info);
        if (info.hasRefund) {
          console.log("已退款");
          deleteInfo(info, this.$data.collection).then((res) => {
            console.log(res);
            this.$message({
              type: "success",
              message: "已删除，请刷新页面",
            });
          });
        } else {
          const promises = info.resourceIds.map((id) => {
            const resource = { _id: id };
            console.log(resource);
            return deleteInfo(resource, "resource");
          });
          Promise.all(promises).then((res) => {
            console.log(res);
            deleteInfo(info, this.$data.collection).then((deleteRes) => {
              console.log(deleteRes);
              this.$message({
                type: "success",
                message: "已删除，请刷新页面",
              });
            });
          });
        }
      });
    },
  },
};
</script>

<style>
</style>