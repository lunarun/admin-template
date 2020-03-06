<!--
 * @Author: YJ
 * @Date: 2019-10-23 10:49:15
 * @LastEditTime: 2019-10-23 12:05:29
 * @LastEditors: Please set LastEditors
 * @Description: 百度地图组件
 * @FilePath: /iyourcar-admin-front-template/src/components/baidu-maps/index.vue
 -->
<style lang="scss">
.bd-map-page {
  $_bdVal: 1px solid #ccc;
  $mapHeight: 500px;
  background: #fff;
  .map-keyword-input {
    margin-bottom: 8px;
    .el-input-group__prepend {
      padding: 0;
      border: none;
    }
    .map-city-select {
      width: 230px;
      .el-input__inner {
        border-right: none;
        border-radius: 0;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
      }
    }
  }
  .map-content {
    border: $_bdVal;
    height: $mapHeight;
    box-sizing: border-box;
  }
  .bd-map-box {
    // width: 700px;
    height: $mapHeight - 2;
    border-left: $_bdVal;
  }
  .address-list-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    .tips-text {
      background: #fff283;
      color: #ff9800;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      box-sizing: border-box;
      padding: 0 8px;
      box-sizing: border-box;
      border-bottom: $_bdVal;
    }
    .addr-result-list {
      overflow-y: auto;
      flex: 1;
      .address-item {
        display: flex;
        cursor: pointer;
        border-bottom: $_bdVal;
        padding: 8px 0;
        &:last-child {
          border: none;
        }
        &.active,
        &:hover {
          background: #f2f2f2;
        }
        .address-marker {
          background-image: url(~src/assets/images/map-marker.png);
          width: 18px;
          height: 27px;
          margin-left: 5px;
          margin-top: 5px;
          background-size: 300px, auto;
        }
        .address-info {
          flex: 1;
          padding: 0 5px;
          text-align: left;
          box-sizing: border-box;
        }
        .address-name {
          padding-top: 5px;
          line-height: 18px;
        }
        .address-text {
          line-height: 18px;
          font-size: 12px;
          color: #888;
        }
      }
    }
    .map-page {
      text-align: center;
      height: 30px;
    }
  }
}
</style>
<template>
  <section class="bd-map-page">
    <el-input
      placeholder="请输入搜索地名"
      v-model="keyword"
      class="map-keyword-input"
    >
      <el-cascader
        placeholder="请选择城市"
        class="map-city-select"
        slot="prepend"
        v-model="cityValue"
        :options="cityOptions"
      ></el-cascader>
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="onSearchKeyword"
      ></el-button>
    </el-input>
    <el-row class="map-content">
      <el-col :span="7" class="address-list-box">
        <div class="tips-text">请选择一个地点</div>
        <div class="addr-result-list">
          <div
            class="address-item"
            :class="{ active: item.id == selectPosition.id }"
            @click="onSelectPosition(index)"
            v-for="(item, index) in pageResult"
            :key="item.id"
          >
            <div
              class="address-marker"
              :style="{
                'background-position':
                  -index * 18 +
                  'px ' +
                  (item.id == selectPosition.id ? -166 : -139) +
                  'px',
              }"
            ></div>
            <div class="address-info">
              <div class="address-name">{{ item.name }}</div>
              <div class="address-text">{{ item.address }}</div>
            </div>
          </div>
        </div>
        <div class="map-page">
          <el-pagination
            small
            layout="prev, pager, next"
            @current-change="onChangeResultPage"
            :pager-count="5"
            :current-page="page.pg"
            :page-count="page.total"
          >
          </el-pagination>
        </div>
      </el-col>
      <el-col :span="17">
        <div class="bd-map-box" id="bd-map-box"></div>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import mapMarkerIcon from 'src/assets/images/map-marker.png';
export default {
  name: 'baiduMap',
  data() {
    return {
      bdMap: null,
      searchService: null,
      // 标记
      mapMarkers: [],
      // 搜索结果
      searchResult: [],
      keyword: '',
      cityValue: [],
      pageResult: [],
      selectPosition: {},
      initMarker: null,
      // 标记图片
      mapMarkerIcon: mapMarkerIcon,
      // 标记size
      mSize: null,
      mOrigin: null,
      mAnchorb: null,
      mScale: null,
      page: {
        pg: 1,
        size: 10,
        // 最大条数
        maxTotal: 100,
        total: 1,
      },
    };
  },
  props: {
    initData: {
      type: Object,
    },
    cityOptions: {
      type: Array,
    },
  },
  methods: {
    initBdMap() {
      this.bdMap = new BMap.Map('bd-map-box', {
        enableMapClick: false,
      });
      this.bdMap.centerAndZoom(new BMap.Point(113.291229, 23.0929), 15);
      this.bdMap.addControl(new BMap.NavigationControl());
      this.bdMap.enableScrollWheelZoom(); //滚轮缩放事件
      // 调用Poi检索类
      this.searchService = new BMap.LocalSearch(this.bdMap, {
        renderOptions: {
          map: this.bdMap,
          selectFirstResult: false,
          autoViewport: true,
        },
        // pageCapacity: 3 || this.page.maxTotal,
        onSearchComplete: (results) => {
          console.log('kkk', results);
          console.log('kkk', results.getPoi());
          let total = results.getCurrentNumPois();

          let pois = results.Br || results.Ar;
          let _total =
            pois.length > this.page.maxTotal ? this.page.maxTotal : pois.length;
          // pois = pois.splice((this.page.pg - 1) * this.page.size, this.page.size * this.page.pg);
          // 最多获取10条搜索记录
          this.page.total = parseInt(_total / this.page.size);
          _total % this.page.size && this.page.total++;
          this.searchResult = pois;
          this.page.pg = 1;
          this.searchService.clearResults();
          this.showPageMarker();

          // for (let i = 0; i < pois.length && i < 11; i++) {
          //     let poi = pois[i];
          //     latlngBounds.extend(poi.latLng);
          //     let marker = new qq.maps.Marker({
          //         map: this.bdMap,
          //         position: poi.latLng
          //     });
          //     this.searchResult.push({
          //         id: pois[i].id,
          //         lat: pois[i].latLng.lat,
          //         lng: pois[i].latLng.lng,
          //         address: pois[i].address,
          //         name: pois[i].name
          //     });
          //     marker.setTitle(i + 1);
          //     this.mapMarkers.push(marker);
          // }
          // this.bdMap.fitBounds(latlngBounds);
        },
      });
      this.searchService.setPageCapacity(this.page.maxTotal);
      this.mSize = new BMap.Size(18, 27);
      this.mAnchorb = new BMap.Size(9, 27);
      this.mScale = new BMap.Size(300, 300);
    },
    /**
     * 初始化标记
     */
    addBeforeMarker(lat, lng) {
      let icon = this.getMapMarkerIcon(0, 'before');
      let position = new BMap.Point(lat, lng);
      if (this.initMarker) {
        // this.initMarker.setMap(null);
        this.bdMap.removeOverlay(this.initMarker);
      }
      this.initMarker = new BMap.Marker(position, icon);
      this.bdMap.addOverlay(this.initMarker);
      this.initMarker.setAnimation(BMAP_ANIMATION_BOUNCE);
      this.bdMap.panTo(position);
    },
    showPageMarker() {
      let latlngBounds = new BMap.Bounds();
      let mini = (this.page.pg - 1) * 10;
      let max = this.page.pg * 10;
      let pois = this.searchResult;
      let ind = 0;
      this.clearAllMarker();

      for (let i = mini; i >= mini && i < max; i++) {
        latlngBounds.extend(pois[i].point);
        let icon = this.getMapMarkerIcon(ind, 'init');
        if (this.selectPosition.id == pois[i].uid) {
          icon = this.getMapMarkerIcon(ind, 'select');
        }
        if (i == 0) continue;
        let marker = new BMap.Marker(pois[i].point, icon);
        marker.mIndex = ind;
        this.bdMap.addOverlay(marker);
        marker.addEventListener('click', this.onClickMarker);
        this.pageResult.push({
          id: pois[i].uid,
          lat: pois[i].point.lat,
          lng: pois[i].point.lng,
          address: pois[i].address || '',
          name: pois[i].title,
        });
        marker.setTitle(i + 1);
        this.mapMarkers.push(marker);
        ind++;
      }
      try {
        // BMapLib.AreaRestriction.setBounds(this.bdMap, latlngBounds);
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 点击标记时，触发
     */
    onClickMarker(event) {
      let marker = event.currentTarget;
      this.onSelectPosition(marker.mIndex);
    },
    /**
     * 清除标记
     */
    clearAllMarker() {
      this.bdMap.clearOverlays();
      // for (let i = 0; i < this.mapMarkers.length; i++) {
      //     this.mapMarkers[i].setMap(null);
      // }
      this.pageResult = [];
      this.mapMarkers = [];
    },
    onSearchKeyword() {
      const city = this.cityValue[this.cityValue.length - 1] || '';
      let tips = '';
      if (!city) {
        tips = '请先选择城市';
      } else if (!this.keyword) {
        tips = '请输入地名关键字';
      }
      if (tips) {
        this.$message.error(tips);
        return;
      }
      this.$onSearchKeyword(this.keyword, city);
    },
    /**
     * 搜索
     */
    $onSearchKeyword(key, city) {
      // this.clearAllMarker();
      this.searchService.setLocation(city || '');
      this.searchService.search(key || '');
    },
    /**
     * 当前页面发生变化时，触发
     */
    onChangeResultPage(val) {
      this.page.pg = val;
      this.showPageMarker();
    },
    /**
     * 设置选择地点
     */
    setSelectPosition(index) {
      let old = this.pageResult.indexOf(this.selectPosition);
      let item = this.pageResult[index];
      this.$emit('click-marker', item);
      this.bdMap.panTo(this.mapMarkers[index].point);
      if (index == old) return;
      if (old != -1) {
        this.mapMarkers[old].setIcon(this.getMapMarkerIcon(old, 'init').icon);
      }
      this.mapMarkers[index].setIcon(
        this.getMapMarkerIcon(index, 'select').icon
      );
    },
    /**
     * 选择
     */
    onSelectPosition(index) {
      this.setSelectPosition(index);
      this.selectPosition = this.pageResult[index];
    },
    /**
     * 获取标记图片配置参数
     */
    getMapMarkerIcon(index, type) {
      let origin = {};
      index = 0 - index;
      if (type == 'select') {
        origin = new BMap.Size(index * 18, -166);
      } else if (type == 'init') {
        origin = new BMap.Size(index * 18, -139);
      } else if (type == 'before') {
        origin = new BMap.Size(-180, -166);
      }
      let icon = new BMap.Icon(this.mapMarkerIcon, this.mSize, {
        anchor: this.mAnchorb,
        size: this.mSize,
        imageSize: this.mScale,
        imageOffset: origin,
      });
      // icon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(300,157));
      return {
        // offset: origin,
        icon: icon,
      };
      // return new BMap.MarkerImage(
      //     this.mapMarkerIcon,
      //     this.mSize,
      //     origin,
      //     this.mAnchorb, this.mScale
      // );
    },
  },
  mounted() {
    this.initBdMap();
    if (this.initData) {
      this.addBeforeMarker(this.initData.lat, this.initData.lng);
    }
    // setTimeout(() => {
    //     this.addBeforeMarker();
    // }, 2000);
  },
};
</script>
