
<template>
  <div class="home-container">
    <div class="home-content">
      <el-table :data="newData" fit border style="margin-top: 10px">
        <el-table-column prop="name" label="开始时间" width="250">
          <template slot-scope="scope">
            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              v-model="scope.row.start"
            ></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="场地" width="300">
          <template slot-scope="scope">
            <el-checkbox-group v-model="selectedCourt" @change="checkinlist">
              <el-checkbox
                v-for="court in courts"
                :key="court._id"
                :label="court"
                :name="scope.row.name"
                >{{ court.name }}</el-checkbox
              >
            </el-checkbox-group>
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="用户昵称" width="120">
          <template slot-scope="scope">
            <el-input v-model="scope.row.nickName"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="phoneNum" label="用户联系方式" width="150">
          <template slot-scope="scope">
            <el-input v-model="scope.row.phoneNum"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              @click="handleAdd(scope.row)"
              size="mini"
              type="primary"
              icon="el-icon-circle-plus"
              >新增</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="datas" height="550" fit border style="">
        <el-table-column prop="createdFormat" label="下单时间" width="150">
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
  getDatas,
  addInfo,
  callCloudFunction,
} from "@/api";

export default {
  name: "other",
  data() {
    return {
      pageCount: 0,
      currentPage: 1,
      selectedCourt: [],
      courts: [],
      pageSize: 20,
      datas: [],
      newData: [{}],
      collection: "courtOrders",
    };
  },
  created() {
    getDatas("courts").then((res) => {
      this.$data.courts = res.data;
    });
    getCollectionCountWithParam(this.$data.collection, { isVIP: true })
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
        console.log(res);
        res.forEach((element) => {
          element.createdFormat = this.$dateFormat(
            element.created,
            "yyyy-mm-dd HH:MM"
          );
          element.orderDateFormat =
            this.$dateFormat(element.orderMsg.start, "yyyy-mm-dd HH:MM") +
            " - " +
            this.$dateFormat(element.orderMsg.end, "HH:MM");
          element.courtsFormat = this.formatOrderCourts(
            element.orderMsg.courts
          );
        });
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
          isVIP: true,
        })
          .then((res) => {
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
        courtsStr += court.name + "，";
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
        callCloudFunction("releaseResource", {
          ids: info.orderMsg.resourceIds,
        })
          .then(() => {
            deleteInfo(info, this.$data.collection)
              .then(() => {
                this.$message({
                  type: "success",
                  message: "已删除，请刷新页面",
                });
              })
              .catch((err) => {
                console.log(err);
                console.log("删除失败");
              });
          })
          .catch((err) => {
            console.log("释放资源失败", err);
          });
      });
    },
    handleAdd(info) {
      const startT = info.start.getTime();
      const endT = startT + 2 * 3600 * 1000;
      const endTime = new Date(endT);
      const order = {
        start: info.start,
        end: endTime,
        courts: this.selectedCourt,
      };
      const infoMsg = {
        _id: "0752" + this.$dateFormat(new Date(), "yyyymmddHHMMss"),
        created: new Date(),
        orderMsg: order,
        isVIP: true,
        validCount: order.courts.length * 30,
        userInfo: {
          nickName: info.nickName,
          phoneNum: info.phoneNum,
        },
      };
      callCloudFunction("checkResource", order)
        .then((res) => {
          if (res.result.resourceAvaliable) {
            infoMsg.orderMsg.resourceIds = res.result.resourceIds;
            addInfo(infoMsg, this.collection)
              .then(() => {
                this.$message({
                  type: "success",
                  message: "新增成功! 请刷新页面",
                });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "新增失败!该场地已被占用",
                });
              });
          } else {
            this.$message({
              type: "info",
              message: "新增失败!",
            });
          }
        })
        .catch(() => {});
    },
    checkinlist() {
      console.log(this.selectedCourt);
    },
  },
};
</script>

<style>
</style>