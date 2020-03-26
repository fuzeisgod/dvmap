<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import BMapGL from "BMapGL";
import BMapGLLib from "BMapGLLib";
export default {
  data() {
    return {
      map: "",
      path: [
        {
          lng: 116.297611,
          lat: 40.047363
        },
        {
          lng: 116.302839,
          lat: 40.048219
        },
        {
          lng: 116.308301,
          lat: 40.050566
        },
        {
          lng: 116.305732,
          lat: 40.054957
        },
        {
          lng: 116.304754,
          lat: 40.057953
        },
        {
          lng: 116.306487,
          lat: 40.058312
        },
        {
          lng: 116.307223,
          lat: 40.056379
        }
      ],
      point: []
    };
  },
  methods: {
    initMap() {
      // 创建 map实例
      this.map = new BMapGL.Map("container");
      // 初始化地图
      var point = new BMapGL.Point(116.297611, 40.047363);
      this.map.centerAndZoom(point, 17);
      // 鼠标滚轮缩放
      this.map.enableScrollWheelZoom(true);
      // 添加比例尺控件
      var scaleCtrl = new BMapGL.ScaleControl();
      this.map.addControl(scaleCtrl);
      // 添加3D控件
      var navi3DCtrl = new BMapGL.NavigationControl3D();
      this.map.addControl(navi3DCtrl);

      // 自定义一个折线轨迹
      for (var i = 0; i < this.path.length; i++) {
        this.point.push(new BMapGL.Point(this.path[i].lng, this.path[i].lat));
      }
      var pl = new BMapGL.Polyline(point);

      // 创建个轨迹动画对象，并配置参数
      var trackAni = new BMapGLLib.TrackAnimation(this.map, pl, {
        overallView: true, // 动画完成后自动调整视野到总览
        tilt: 30, // 轨迹播放的角度，默认为55
        duration: 20000, // 动画持续时长，默认为10000，单位ms
        delay: 3000 // 动画开始的延迟，默认0，单位ms
      });

      trackAni.start();
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>