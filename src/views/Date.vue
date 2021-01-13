<template>
  <div class="home-container">
    <div class="home-content">
      <el-date-picker
        v-model="value"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions"
        @change="onPick"
      >
      </el-date-picker>
      <el-table :data="period" fit border style="">
        <el-table-column prop="dateFormat" label="时间段" width="150">
        </el-table-column>
        <el-table-column prop="courts" label="已定场地" width="200">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable operator-linebreak */

import { getDataWithId, getCollectionsWithParam } from "@/api";
import vue from "../main.js";

const db = vue.$app.database();
export default {
  name: "date",
  data() {
    return {
      pickerOptions: {
        // disabledDate(time) {
        //   return time.getTime() > Date.now();
        // },
      },
      value: new Date(new Date().toLocaleDateString()),
      period: [],
    };
  },
  async created() {
    this.$data.period = await this.getPeriod(this.$data.value);
  },
  methods: {
    async onPick() {
      this.$data.period = await this.getPeriod(this.$data.value);
    },
    async getPeriod(date) {
      const week = await getDataWithId("week", date.getDay().toString());
      const period = [];
      week.data[0].period.forEach((element) => {
        const tempDic = {};
        const startDate = new Date(this.$data.value.valueOf());
        startDate.setHours(element.startHour);
        startDate.setMinutes(element.startMinute);
        tempDic.start = startDate;
        const endDate = new Date(this.$data.value.valueOf());
        endDate.setHours(element.endHour);
        endDate.setMinutes(element.endMinute);
        tempDic.dateFormat =
          this.$dateFormat(startDate, "HH:MM") +
          " - " +
          this.$dateFormat(endDate, "HH:MM");
        tempDic.courts = [];
        period.push(tempDic);
      });
      const start = await this.getStart(this.$data.value);
      const res = await this.getOrders(this.$data.value);
      res.forEach((element) => {
        const str = this.$dateFormat(
          element.orderMsg.start,
          "yyyy-mm-dd HH:MM"
        );
        const index = start.indexOf(str);
        element.orderMsg.courts.forEach((court) => {
          period[index].courts.push(court.name);
        });
        period[index].courts.sort();
      });
      period.forEach((element) => {
        element.courts = element.courts.join(", ");
      });
      return period;
    },
    async getStart(date) {
      const week = await getDataWithId("week", date.getDay().toString());
      const start = [];
      week.data[0].period.forEach((element) => {
        const startDate = new Date(this.$data.value.valueOf());
        startDate.setHours(element.startHour);
        startDate.setMinutes(element.startMinute);
        start.push(this.$dateFormat(startDate, "yyyy-mm-dd HH:MM"));
      });
      return start;
    },
    async getOrders(date) {
      let tomorrow = new Date(date.valueOf());
      tomorrow.setTime(tomorrow.getTime() + 24 * 60 * 60 * 1000);
      let orders = [];
      const res = await getCollectionsWithParam("courtOrders", {
        "orderMsg.start": db.command.gte(date),
        "orderMsg.end": db.command.lte(tomorrow),
        hasRefund: false,
      });
      orders = orders.concat(res.data);
      const res2 = await getCollectionsWithParam("courtOrders", {
        "orderMsg.start": db.command.gte(date),
        "orderMsg.end": db.command.lte(tomorrow),
        isVIP: true,
      });
      orders = orders.concat(res2.data);
      return orders;
    },
  },
};
</script>