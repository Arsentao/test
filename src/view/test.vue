<template>
  <div class="result">
    <van-popup v-model="show" class="pop" position="top" round>
      <img src="../assets/images/arrow.png" width="50%" height="70%" />
      <p class="parm">立即分享给好友吧</p>
      <p class="parm">点击屏幕右上方可将本页面分享到朋友圈</p>
    </van-popup>
    <img :src="url" width="100%" height="100%" />
    <img src="../assets/images/code.png" class="code" v-show="false" />
    <img
      class="background"
      src="../assets/images/blue.jpg"
      @load="drawAndShareImage()"
      v-show="false"
      v-if="background == 'blue'"
    />
    <img
      class="background"
      src="../assets/images/green.jpg"
      @load="drawAndShareImage()"
      v-show="false"
      v-if="background == 'green'"
    />
    <img
      class="background"
      src="../assets/images/red.jpg"
      @load="drawAndShareImage()"
      v-show="false"
      v-if="background == 'red'"
    />
    <img
      class="background"
      src="../assets/images/orange.jpg"
      @load="drawAndShareImage()"
      v-show="false"
      v-if="background == 'orange'"
    />
    <img
      class="background"
      src="../assets/images/purple.jpg"
      @load="drawAndShareImage()"
      v-show="false"
      v-if="background == 'purple'"
    />
    <div class="share" @click="share()"></div>
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
      show: false,
      width: 0,
      height: 0,
      url: "",
      canvas: "",
      context: "",
      textPx: 0
    };
  },
  mounted() {
    this.width = document.querySelector(".result").offsetWidth;
    this.height = document.querySelector(".result").offsetHeight;
    this.textPx = (((this.height * 20) / 667) * 0.77).toFixed(1) + "px";
  },
  created() {
    //      let agent = navigator.userAgent
    //  let isIOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    //  if(isIOS && !sessionStorage.getItem('isShareState')){
    //    sessionStorage.setItem('isShareState',true)
    //    this.$router.go(0)
    //  }

    this.axios
      .get("/haha")
      .then(function(res) {
        wx.config({
          debug: false,
          appId: "wx72dcc0c8ae1265f9",
          timestamp: res.data.timestamp,
          nonceStr: res.data.noncestr,
          signature: res.data.signature,
          jsApiList: ["updateTimelineShareData"]
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    wx.ready(function() {
      wx.updateTimelineShareData({
        title: "测一测你是什么样的华工青年",
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
  destroyed() {
    sessionStorage.removeItem("isShareState");
  },

  methods: {
    share() {
      this.show = true;
    },
    drawAndShareImage() {
      this.canvas = document.createElement("canvas");
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.context = this.canvas.getContext("2d");
      this.context.clearRect(0, 0, this.width, this.height);
      this.insertUrl();
    },

    insertUrl() {
      this.context.drawImage(
        document.querySelector(".background"),
        0,
        0,
        this.width,
        this.height
      );
      this.context.drawImage(
        document.querySelector(".code"),
        this.width * 0.395,
        this.height * 0.885
      );

      this.drawText(
        this.text,
        this.width * 0.25,
        this.height * 0.595,
        this.width * 0.64
      );

      this.url = this.canvas.toDataURL("image/jpg", 1.0);
    },
    drawText(t, x, y, w) {
      var chr = t.split("");
      var temp = "";
      var row = [];

      this.context.font = this.textPx + " Arial";
      console.log(this.context.font);
      this.context.textBaseline = "middle";
      for (var a = 0; a < chr.length; a++) {
        if (this.context.measureText(temp).width < w) {
        } else {
          row.push(temp);
          temp = "";
        }
        temp += chr[a];
      }

      row.push(temp);

      for (var b = 0; b < row.length; b++) {
        this.context.fillText(row[b], x, y + (b + 1) * 20);
      }
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
</style>