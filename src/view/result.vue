<template>
  <div class="result">
    <van-popup v-model="show" class="pop" position="top" round>
      <img src="../assets/images/arrow.png" width="50%" height="70%" />
      <p class="parm">立即分享给好友吧</p>
      <p class="parm">点击屏幕右上方可将本页面分享到朋友圈</p>
    </van-popup>
    <img class="background" src="../assets/images/blue.jpg" v-if="background == 'blue'" />
    <img class="background" src="../assets/images/green.jpg" v-if="background == 'green'" />
    <img class="background" src="../assets/images/red.jpg" v-if="background == 'red'" />
    <img class="background" src="../assets/images/orange.jpg" v-if="background == 'orange'" />
    <img class="background" src="../assets/images/purple.jpg" v-if="background == 'purple'" />
    <div class="share" @click="share()"></div>
    <div class="info">{{text}}</div>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
export default {
  computed: {
    colorArray() {
      return [this.blue, this.orange, this.green, this.red, this.purple];
    },
    maxColor() {
      return this.colorArray.findIndex(
        value =>
          value ==
          [this.blue, this.orange, this.green, this.red, this.purple].sort(
            (a, b) => b - a
          )[0]
      );
    },
    monthArray() {
      return [this.kind1, this.kind2, this.kind3, this.kind4];
    },
    maxMonth() {
      return this.monthArray.findIndex(
        value =>
          value ==
          [this.kind1, this.kind2, this.kind3, this.kind4].sort(
            (a, b) => b - a
          )[0]
      );
    },
    maxKind() {
      if (this.maxMonth == 0) {
        return "1~3月";
      } else if (this.maxMonth == 1) {
        return "4~6月";
      } else if (this.maxMonth == 2) {
        return "7~9月";
      } else {
        return "10~12月";
      }
    },
    background() {
      if (this.maxColor == 0) {
        return "blue";
      } else if (this.maxColor == 1) {
        return "orange";
      } else if (this.maxColor == 2) {
        return "green";
      } else if (this.maxColor == 3) {
        return "red";
      } else {
        return "purple";
      }
    },
    percent() {
      if (this.monthArray.reduce((a, b) => a + b) == 0) {
        return "0%";
      } else {
        return (
          (
            ([this.kind1, this.kind2, this.kind3, this.kind4].sort(
              (a, b) => b - a
            )[0] /
              this.num) *
            100
          ).toFixed(1) + "%"
        );
      }
    },
    custom() {
      if (this.num == 0) {
        return "0%";
      } else if (this.num == 1) {
        return "7.6%";
      } else if (this.num == 2) {
        return "11.5%";
      } else if (this.num == 3) {
        return "17.2%";
      } else if (this.num == 4) {
        return "28.6%";
      } else if (this.num == 5) {
        return "33.7%";
      } else if (this.num == 6) {
        return "39.2%";
      } else if (this.num == 7) {
        return "55.4%";
      } else if (8 <= this.num && this.num <= 9) {
        return "68.1%";
      } else if (10 <= this.num && this.num <= 12) {
        return "80.1%";
      } else if (13 <= this.num && this.num <= 15) {
        return "92.4%";
      } else if (16 <= this.num && this.num <= 18) {
        return "98.4%";
      } else {
        return "99.9%";
      }
    },
    text() {
      return (
        "2019年您共计参加活动" +
        this.num +
        "次,超过" +
        this.custom +
        "的用户,参与" +
        this.maxKind +
        "活动数量最多,占比超过" +
        this.percent
      );
    },
    title() {
      if (this.background == "red") {
        return "原来我是华工热血青年";
      } else if (this.background == "blue") {
        return "原来我是华工学霸青年";
      } else if (this.background == "purple") {
        return "原来我是华工文艺青年";
      } else if (this.background == "orange") {
        return "原来我是华工爱心天使";
      } else {
        return "原来我是华工小可爱";
      }
    }
  },
  data() {
    return {
      blue: JSON.parse(localStorage.getItem("store")).blue,
      green: JSON.parse(localStorage.getItem("store")).green,
      red: JSON.parse(localStorage.getItem("store")).red,
      purple: JSON.parse(localStorage.getItem("store")).purple,
      orange: JSON.parse(localStorage.getItem("store")).orange,
      kind1: JSON.parse(localStorage.getItem("store")).kind1,
      kind2: JSON.parse(localStorage.getItem("store")).kind2,
      kind3: JSON.parse(localStorage.getItem("store")).kind3,
      kind4: JSON.parse(localStorage.getItem("store")).kind4,
      num: parseInt(localStorage.getItem("num")),
      show: false
    };
  },

  mounted() {
    this.axios
      .get("/haha")
      .then(function(res) {
        wx.config({
          debug: false,
          appId: "wx72dcc0c8ae1265f9",
          timestamp: res.data.timestamp,
          nonceStr: res.data.noncestr,
          signature: res.data.signature,
          jsApiList: ["updateTimelineShareData", "updateAppMessageShareData"]
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    let that = this;
    wx.ready(function() {
      wx.updateTimelineShareData({
        title: that.title,
        link: "http://www.13511351.com/result",
        imgUrl:
          "https://fengpu1351-1300303301.cos.ap-guangzhou.myqcloud.com/%E5%A5%87%E5%A6%99%E5%AD%A6%E7%90%B4%E8%AE%B0/index.jpg",
        success: function() {
          console.log("成功");
        }
      });
    });

    wx.ready(function() {
      wx.updateAppMessageShareData({
        title: that.title,
        desc: that.title,
        link: "http://www.13511351.com/result",
        imgUrl:
          "https://fengpu1351-1300303301.cos.ap-guangzhou.myqcloud.com/%E5%A5%87%E5%A6%99%E5%AD%A6%E7%90%B4%E8%AE%B0/index.jpg",
        success: function() {
          console.log("成功");
        }
      });
    });

    wx.error(function(res) {
      console.log(res);
    });
  },

  methods: {
    share() {
      this.show = true;
    }
  }
};
</script>

<style scoped>
.result {
  width: 100%;
  height: 100%;
  z-index: -100;
  overflow: auto;
  position: absolute;
}

.share {
  position: absolute;
  bottom: 3%;
  right: 5%;
  width: 35%;
  height: 10%;
}
.pop {
  width: 100%;
  height: 48%;
}
.parm {
  font-size: 1rem;
  font-weight: bold;
  line-height: 200%;
  color: rgb(66, 173, 223);
}
.background {
  height: 100%;
  width: 100%;
}
.code {
  position: absolute;
  left: 40%;
  bottom: 5%;
}
.info {
  position: absolute;
  height: 9%;
  width: 66%;
  bottom: 31%;
  right: 10%;
  text-align: left;
  font-size: 0.8rem;
}
</style>