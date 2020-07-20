<template>
  <div class="select">
    <span class="totalNum">{{num}}</span>
    <div class="lookUp" @click="submit()"></div>
    <div class="selectMonth">
      <img v-show="!isselect1" src="../assets/images/month1.png" @click="select1()" />
      <img v-show="isselect1" src="../assets/images/selectMonth1.png" />
      <img v-show="!isselect2" src="../assets/images/month2.png" @click="select2()" />
      <img v-show="isselect2" src="../assets/images/selectMonth2.png" />
      <img v-show="!isselect3" src="../assets/images/month3.png" @click="select3()" />
      <img v-show="isselect3" src="../assets/images/selectMonth3.png" />
      <img v-show="!isselect4" src="../assets/images/month4.png" @click="select4()" />
      <img v-show="isselect4" src="../assets/images/selectMonth4.png" />
    </div>
    <div class="canvas">
      <div class="select1" ref="myDiv" @scroll.passive="getScroll()">
        <ul>
          <li v-for="(item,index) in picture" class="img_li" :key="index">
            <div class="img_div" :class="{'div_select':item.select}" @click="selectImg(index)">
              <div class="img_btn">
                <img :src="item.url" class="img" :class="{'img_select':item.select}" />
                <button class="btn_select" v-show="item.select"></button>
              </div>
              <span class="img_title">{{item.title}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      store: {
        red: 0,
        blue: 0,
        green: 0,
        purple: 0,
        orange: 0,
        kind1: 0,
        kind2: 0,
        kind3: 0,
        kind4: 0
      },
      num: 0,
      percent1: 0,
      percent2: 0.122,
      percent3: 0.402,
      percent4: 0.502,
      currentindex: "",
      ifImgSelect: false,
      isselect1: true,
      isselect2: false,
      isselect3: false,
      isselect4: false,
      picture: [
        {
          color: "green",
          kind: 1,
          select: false,
          url: require("../assets/images/1.jpg"),
          title: "2018级新生军训"
        },
        {
          color: "orange",
          kind: 1,
          select: false,
          url: require("../assets/images/2.jpg"),
          title: "春运志愿服务活动"
        },
        {
          color: "red",
          kind: 1,
          select: false,
          url: require("../assets/images/3.jpg"),
          title: "2019年寒假“砥砺奋进七十年 青春献礼新时代”主题社会实践活动"
        },
        {
          color: "red",
          kind: 1,
          select: false,
          url: require("../assets/images/4.jpg"),
          title: "“青年大学习”之两会时刻"
        },
        {
          color: "orange",
          kind: 1,
          select: false,
          url: require("../assets/images/5.jpg"),
          title: "志愿服务一条街"
        },
        {
          color: "blue",
          kind: 1,
          select: false,
          url: require("../assets/images/6.jpg"),
          title:
            "华南理工大学第十六届“挑战杯”大学生课外学术科技作品竞赛终审决赛"
        },
        {
          color: "purple",
          kind: 2,
          select: false,
          url: require("../assets/images/7.jpg"),
          title: "广州芭蕾舞团华南理工大学专场演出"
        },
        {
          color: "red",
          kind: 2,
          select: false,
          url: require("../assets/images/8.jpg"),
          title: "纪念五四运动100周年主题团日暨升旗仪式"
        },
        {
          color: "red",
          kind: 2,
          select: false,
          url: require("../assets/images/9.jpg"),
          title: "与信仰对话——新时代国旗文化的使命"
        },
        {
          color: "red",
          kind: 2,
          select: false,
          url: require("../assets/images/10.jpg"),
          title: "纪念五四运动100周年表彰晚会"
        },
        {
          color: "red",
          kind: 2,
          select: false,
          url: require("../assets/images/11.jpg"),
          title: "收看纪念五四运动100周年大会"
        },
        {
          color: "red",
          kind: 2,
          select: false,
          url: require("../assets/images/12.jpg"),
          title: "校长思政第一课"
        },
        {
          color: "redpurple",
          kind: 2,
          select: false,
          url: require("../assets/images/13.jpg"),
          title: "大型原创多媒体全景式话剧《红色甲工 血色浪漫》首场演出"
        },
        {
          color: "purple",
          kind: 2,
          select: false,
          url: require("../assets/images/14.jpg"),
          title: "《美丽中国》舞蹈专场演出"
        },
        {
          color: "purple",
          kind: 2,
          select: false,
          url: require("../assets/images/15.jpg"),
          title: "“赏中华诗词·承千年文脉”2019年华园诗词大会"
        },
        {
          color: "red",
          kind: 2,
          select: false,
          url: require("../assets/images/16.jpg"),
          title: "“十大学生共产党员、共青团员标兵”评选"
        },
        {
          color: "green",
          kind: 2,
          select: false,
          url: require("../assets/images/17.jpg"),
          title: "“十佳学生社团”评选"
        },
        {
          color: "redpurple",
          kind: 2,
          select: false,
          url: require("../assets/images/18.jpg"),
          title: "原创话剧《星星之火》演出"
        },
        {
          color: "green",
          kind: 2,
          select: false,
          url: require("../assets/images/19.jpg"),
          title: "2019届学生毕业典礼"
        },
        {
          color: "green",
          kind: 2,
          select: false,
          url: require("../assets/images/20.jpg"),
          title: "团支部风采大赛"
        },
        {
          color: "redgreen",
          kind: 3,
          select: false,
          url: require("../assets/images/21.jpg"),
          title: "2019年暑假“青春奋斗新时代·乡村振兴建新功”主题社会实践活动"
        },
        {
          color: "redgreen",
          kind: 3,
          select: false,
          url: require("../assets/images/22.jpg"),
          title: "青马学员重走长征路"
        },
        {
          color: "green",
          kind: 3,
          select: false,
          url: require("../assets/images/23.jpg"),
          title: "迎新现场"
        },
        {
          color: "green",
          kind: 3,
          select: false,
          url: require("../assets/images/24.jpg"),
          title: "广州国际校区开学演练"
        },
        {
          color: "green",
          kind: 3,
          select: false,
          url: require("../assets/images/25.jpg"),
          title: "广州国际校区开学典礼"
        },
        {
          color: "red",
          kind: 4,
          select: false,
          url: require("../assets/images/26.jpg"),
          title: "庆祝中华人民共和国成立70周年升旗仪式"
        },
        {
          color: "red",
          kind: 4,
          select: false,
          url: require("../assets/images/27.jpg"),
          title: "收看庆祝中华人民共和国成立70周年大会"
        },
        {
          color: "red",
          kind: 4,
          select: false,
          url: require("../assets/images/28.jpg"),
          title: "“不忘初心、青春誓言”系列微视频线上活动"
        },
        {
          color: "redpurple",
          kind: 4,
          select: false,
          url: require("../assets/images/29.jpg"),
          title: "广东省话剧院大型原创话剧《信仰》华南理工大学专场"
        },
        {
          color: "green",
          kind: 4,
          select: false,
          url: require("../assets/images/30.jpg"),
          title: "百团大战"
        },
        {
          color: "purple",
          kind: 4,
          select: false,
          url: require("../assets/images/31.jpg"),
          title: "中央民族歌舞团走进华南理工大学专场演出"
        },
        {
          color: "red",
          kind: 4,
          select: false,
          url: require("../assets/images/32.jpg"),
          title: "“两个一百年奋斗目标与青年使命”专题思政课"
        },
        {
          color: "blue",
          kind: 4,
          select: false,
          url: require("../assets/images/33.jpg"),
          title: "走近诺贝尔学术报告会"
        },
        {
          color: "green",
          kind: 4,
          select: false,
          url: require("../assets/images/34.jpg"),
          title: "雕刻时光"
        },
        {
          color: "redpurple",
          kind: 4,
          select: false,
          url: require("../assets/images/35.jpg"),
          title: "大型原创多媒体全景式话剧《红色甲工 血色浪漫》三场连演"
        },
        {
          color: "green",
          kind: 4,
          select: false,
          url: require("../assets/images/36.jpg"),
          title: "华南理工大学2019年校友返校日系列活动"
        },
        {
          color: "green",
          kind: 4,
          select: false,
          url: require("../assets/images/37.jpg"),
          title: "2019年华南理工大学校运会"
        },
        {
          color: "blue",
          kind: 4,
          select: false,
          url: require("../assets/images/38.jpg"),
          title: "助力学校捧得“挑战杯”全国赛“优胜杯”"
        },
        {
          color: "green",
          kind: 4,
          select: false,
          url: require("../assets/images/39.jpg"),
          title: "“三走”体育嘉年华"
        },
        {
          color: "green",
          kind: 4,
          select: false,
          url: require("../assets/images/40.jpg"),
          title: "美食文化节"
        },
        {
          color: "green",
          kind: 4,
          select: false,
          url: require("../assets/images/41.jpg"),
          title: "“华音初上”校园歌手大赛"
        },
        {
          color: "green",
          kind: 4,
          select: false,
          url: require("../assets/images/42.jpg"),
          title: "公益文化节"
        },
        {
          color: "green",
          kind: 4,
          select: false,
          url: require("../assets/images/43.jpg"),
          title: "“感动华园”年度人物"
        },
        {
          color: "green",
          kind: 4,
          select: false,
          url: require("../assets/images/44.jpg"),
          title: "爱上你主播"
        },
        {
          color: "green",
          kind: 4,
          select: false,
          url: require("../assets/images/45.jpg"),
          title: "社团文化节"
        },
        {
          color: "green",
          kind: 4,
          select: false,
          url: require("../assets/images/46.jpg"),
          title: "2019年科技文化节闭幕式暨红色经典演绎大赛总决赛"
        },
        {
          color: "green",
          kind: 4,
          select: false,
          url: require("../assets/images/47.jpg"),
          title: "十大提案"
        },
        {
          color: "redgreen",
          kind: 4,
          select: false,
          url: require("../assets/images/48.jpg"),
          title: "学习党的十九届四中全会精神"
        },
        {
          color: "orange",
          kind: 4,
          select: false,
          url: require("../assets/images/49.jpg"),
          title: "广州马拉松志愿服务"
        },
        {
          color: "orange",
          kind: 4,
          select: false,
          url: require("../assets/images/50.jpg"),
          title: "世界羽联巡回赛志愿服务"
        }
      ]
    };
  },

  destroyed() {
    sessionStorage.removeItem("isShareState");
  },
  methods: {
    getScroll() {
      var scrollPercent = (
        this.$refs.myDiv.scrollTop / this.$refs.myDiv.scrollHeight
      ).toFixed(3);
      console.log(scrollPercent);
      if (scrollPercent >= this.percent1 && scrollPercent < this.percent2) {
        this.isselect1 = true;
        this.isselect2 = false;
        this.isselect3 = false;
        this.isselect4 = false;
      } else if (
        scrollPercent >= this.percent2 &&
        scrollPercent < this.percent3
      ) {
        this.isselect2 = true;
        this.isselect1 = false;
        this.isselect3 = false;
        this.isselect4 = false;
      } else if (
        scrollPercent >= this.percent3 &&
        scrollPercent < this.percent4
      ) {
        this.isselect3 = true;
        this.isselect1 = false;
        this.isselect2 = false;
        this.isselect4 = false;
      } else {
        this.isselect4 = true;
        this.isselect1 = false;
        this.isselect2 = false;
        this.isselect3 = false;
      }
    },
    submit() {
      localStorage.setItem("num", this.num);
      localStorage.setItem("store", JSON.stringify(this.store));
      window.location.href = "http://www.13511351.com/result";
    },
    select1() {
      this.isselect1 = true;
      this.isselect2 = false;
      this.isselect3 = false;
      this.isselect4 = false;
      this.$refs.myDiv.scrollTop =
        this.$refs.myDiv.scrollHeight * this.percent1;
    },
    select2() {
      this.isselect2 = true;
      this.isselect1 = false;
      this.isselect3 = false;
      this.isselect4 = false;
      this.$refs.myDiv.scrollTop =
        this.$refs.myDiv.scrollHeight * this.percent2;
    },
    select3() {
      this.isselect3 = true;
      this.isselect1 = false;
      this.isselect2 = false;
      this.isselect4 = false;
      this.$refs.myDiv.scrollTop =
        this.$refs.myDiv.scrollHeight * this.percent3;
    },
    select4() {
      this.isselect4 = true;
      this.isselect1 = false;
      this.isselect2 = false;
      this.isselect3 = false;
      this.$refs.myDiv.scrollTop =
        this.$refs.myDiv.scrollHeight * this.percent4;
    },
    pushColor(index) {
      if (this.picture[index].color == "red") {
        this.store.red++;
      } else if (this.picture[index].color == "green") {
        this.store.green++;
      } else if (this.picture[index].color == "blue") {
        this.store.blue++;
      } else if (this.picture[index].color == "orange") {
        this.store.orange++;
      } else if (this.picture[index].color == "purple") {
        this.store.purple++;
      } else if (this.picture[index].color == "redgreen") {
        this.store.red++;
        this.store.green++;
      } else {
        this.store.red++;
        this.store.purple++;
      }
    },
    popColor(index) {
      if (this.picture[index].color == "red") {
        this.store.red--;
      } else if (this.picture[index].color == "green") {
        this.store.green--;
      } else if (this.picture[index].color == "blue") {
        this.store.blue--;
      } else if (this.picture[index].color == "orange") {
        this.store.orange--;
      } else if (this.picture[index].color == "purple") {
        this.store.purple--;
      } else if (this.picture[index].color == "redgreen") {
        this.store.red--;
        this.store.green--;
      } else {
        this.store.red--;
        this.store.purple--;
      }
    },
    pushMonth(index) {
      if (this.picture[index].kind == 1) {
        this.store.kind1++;
      } else if (this.picture[index].kind == 2) {
        this.store.kind2++;
      } else if (this.picture[index].kind == 3) {
        this.store.kind3++;
      } else {
        this.store.kind4++;
      }
    },
    popMonth(index) {
      if (this.picture[index].kind == 1) {
        this.store.kind1--;
      } else if (this.picture[index].kind == 2) {
        this.store.kind2--;
      } else if (this.picture[index].kind == 3) {
        this.store.kind3--;
      } else {
        this.store.kind4--;
      }
    },
    selectImg(index) {
      this.picture[index].select = !this.picture[index].select;
      if (this.picture[index].select == true) {
        this.num++;
        this.pushColor(index);
        this.pushMonth(index);
      } else {
        this.num--;
        this.popColor(index);
        this.popMonth(index);
      }
    }
  }
};
</script>

<style scoped>
.select {
  width: 100%;
  height: 100%;
  background: url("https://fengpu1351-1300303301.cos.ap-guangzhou.myqcloud.com/%E5%A5%87%E5%A6%99%E5%AD%A6%E7%90%B4%E8%AE%B0/select.jpg");
  background-size: 100% 100%;
  z-index: -100;
  overflow: auto;
  position: absolute;
}
.selectMonth {
  position: absolute;
  width: 80%;
  left: 10%;
  top: 17%;
}
.selectMonth img {
  width: 4rem;
  height: 3rem;
}
.canvas {
  width: 91%;
  height: 60%;
  position: absolute;
  left: 5%;
  top: 25%;
  overflow: hidden;
}
.select1 {
  height: 100%;
  width: 100%;
  overflow: scroll;
}
.img_div {
  width: 100%;
  background-color: white;
  position: relative;
}

.img {
  width: 100%;
  height: 16rem;
}
.img_title {
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 2px;
}
.div_select {
  border: 5px solid rgb(43, 198, 43);
}
.img_select {
  filter: blur(1px);
}
.totalNum {
  font-weight: bold;
  position: absolute;
  font-size: 1.8rem;
  color: rgb(170, 57, 58);
  bottom: 8.2%;
  right: 48%;
}
.btn {
  position: absolute;
  bottom: 0%;
  left: 4.1%;
  width: 93.2%;
  height: 5.5%;
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(170, 57, 58);
  border: none;
  background-color: rgb(231, 199, 138);
  z-index: 1000;
  border-radius: 0.8rem;
}
.btn_select {
  position: absolute;
  right: 22%;
  top: 22%;
  border: none;
  background: url("../assets/images/select.png") no-repeat;
  width: 10rem;
  height: 10rem;
}
.img_btn {
  width: 100%;
  height: 16rem;
}
.lookUp {
  position: absolute;
  width: 40%;
  height: 6%;
  bottom: 0%;
  left: 29%;
}
</style>