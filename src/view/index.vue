<template>
  <div class="index">
    <div class="btn_review" @click="routerChange()"></div>
  </div>
</template>

<script>
export default {
  methods: {
    routerChange() {
      this.$router.replace("/select");
    }
  },
  created() {
    let agent = navigator.userAgent;
    let isIOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    if (isIOS && !sessionStorage.getItem("isShareState")) {
      sessionStorage.setItem("isShareState", true);
      this.$router.go(0);
    }
  },
  destroyed() {
    sessionStorage.removeItem("isShareState");
  }
};
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  background: url("https://fengpu1351-1300303301.cos.ap-guangzhou.myqcloud.com/%E5%A5%87%E5%A6%99%E5%AD%A6%E7%90%B4%E8%AE%B0/index.jpg");
  background-size: 100% 100%;
  z-index: -100;
  overflow: auto;
  position: absolute;
}
.btn_review {
  width: 65%;
  height: 14%;
  position: absolute;
  bottom: 3.5%;
  right: 11%;
}
</style>