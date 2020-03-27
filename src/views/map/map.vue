<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import BMap from "BMap";
export default {
  data() {
    return {
      map: ""
    };
  },
  methods: {
    initMap() {
      // 创建 map实例
      this.map = new BMap.Map("container");
      this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);

      // 鼠标滚轮缩放
      this.map.enableScrollWheelZoom(true);

      // 左上角，添加比例尺
      var top_left_control = new BMap.ScaleControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT
      });
      this.map.addControl(top_left_control);
      // 添加带有定位的导航控件
      var navigationControl = new BMap.NavigationControl({
        // 靠左上角位置
        anchor: BMAP_ANCHOR_TOP_LEFT,
        // LARGE类型
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        // 启用显示定位
        enableGeolocation: true
      });
      this.map.addControl(navigationControl);

      // 添加定位控件
      var geolocationControl = new BMap.GeolocationControl();
      geolocationControl.addEventListener("locationSuccess", function(e) {
        // 定位成功事件
        var address = "";
        address += e.addressComponent.province;
        address += e.addressComponent.city;
        address += e.addressComponent.district;
        address += e.addressComponent.street;
        address += e.addressComponent.streetNumber;
        alert("当前定位地址为：" + address);
      });
      geolocationControl.addEventListener("locationError", function(e) {
        // 定位失败事件
        alert(e.message);
      });
      this.map.addControl(geolocationControl);

      // 城市列表控件
      var cityListControl = new BMap.CityListControl({
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        offset: new BMap.Size(10, 20)
        // 切换城市之前事件
        // onChangeBefore: function(){
        //    alert('before');
        // },
        // 切换城市之后事件
        // onChangeAfter:function(){
        //   alert('after');
        // }
      });
      this.map.addControl(cityListControl);
    },
    addLine() {
      var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
        scale: 0.6, //图标缩放大小
        strokeColor: "#fff", //设置矢量图标的线填充颜色
        strokeWeight: "1" //设置线宽
      });
      var icons = new BMap.IconSequence(sy, "10", "30");
      // 创建polyline对象
      var pois = [
        new BMap.Point(116.350658, 39.938285),
        new BMap.Point(116.386446, 39.939281),
        new BMap.Point(116.389034, 39.913828),
        new BMap.Point(116.442501, 39.914603)
      ];
      var polyline = new BMap.Polyline(pois, {
        enableEditing: false, //是否启用线编辑，默认为false
        enableClicking: true, //是否响应点击事件，默认为true
        icons: [icons],
        strokeWeight: "5", //折线的宽度，以像素为单位
        strokeOpacity: 0.8, //折线的透明度，取值范围0 - 1
        strokeColor: "#5300FC" //折线颜色
      });

      this.map.addOverlay(polyline); //增加折线
    }
  },
  mounted() {
    this.initMap();
    this.addLine();
  }
};
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>