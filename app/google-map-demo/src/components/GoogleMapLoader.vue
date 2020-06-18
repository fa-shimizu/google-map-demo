<template>
  <div class="main">
    <div class="info">
      <div class="input-box">
        <span class="form-control center">
          <label for="lat">緯度</label>
          <br />
          <input type="text" name="lat" v-model="inputConfig.center.lat" />
        </span>
        <span class="form-control center">
          <label for="lng">経度</label>
          <br />
          <input type="text" name="lng" v-model="inputConfig.center.lng" />
        </span>
        <span class="form-control zoom">
          <label for="zoom">縮尺</label>
          <br />
          <input type="text" name="zoom" v-model="inputConfig.zoom" />
        </span>
        <div class="button-box">
          <button class="get" @click="getMapConfig">取得</button>
          <button class="set" @click="setMapConfig">反映</button>
        </div>
      </div>
      <div class="text-box">
        <span class="text-control center">
          <span>緯度</span>
          <br />
          <span>{{ this.mapConfig.center.lat }}</span>
        </span>
        <span class="text-control center">
          <span>経度</span>
          <br />
          <span>{{ this.mapConfig.center.lng }}</span>
        </span>
        <span class="text-control zoom">
          <span>縮尺</span>
          <br />
          <span>{{ this.mapConfig.zoom }}</span>
        </span>
      </div>
    </div>
    <div class="map" ref="googleMap"></div>
  </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";

export default {
  name: "Map",
  data() {
    return {
      google: null,
      map: null,
      initConfig: {
        center: {
          lat: 35.68944,
          lng: 139.69167
        },
        zoom: 17
      },
      inputConfig: {
        center: {
          lat: null,
          lng: null
        },
        zoom: null
      },
      apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY
    };
  },
  async mounted() {
    this.google = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    });
    this.map = this.initializeMap();
    this.getMapConfig();
  },
  computed: {
    mapConfig() {
      const map = this.map;
      if (map !== null) {
        const center = map.getCenter();
        const zoom = map.getZoom();
        return {
          center: {
            lat: center.lat(),
            lng: center.lng()
          },
          zoom: zoom
        };
      } else {
        return this.initConfig;
      }
    }
  },
  methods: {
    initializeMap() {
      return new this.google.maps.Map(this.$refs.googleMap, this.initConfig);
    },
    getMapConfig() {
      const center = this.map.getCenter();
      const zoom = this.map.getZoom();
      this.inputConfig = {
        center: {
          lat: center.lat(),
          lng: center.lng()
        },
        zoom: zoom
      };
    },
    setMapConfig() {
      const newConfig = {
        center: {
          lat: parseFloat(this.inputConfig.center.lat),
          lng: parseFloat(this.inputConfig.center.lng)
        },
        zoom: parseInt(this.inputConfig.zoom)
      };
      this.map.setCenter(newConfig.center);
      this.map.setZoom(newConfig.zoom);
    }
  }
};
</script>

<style scoped>
.main {
  display: grid;
  grid-template-areas: "info map";
}

.info {
  grid-area: info;
  height: 100vh;
  width: 30vw;
}

.map {
  grid-area: map;

  height: 100vh;
  width: 70vw;
}

.form-control {
  display: inline-block;
  margin: 8px 4px;
}

.form-control label {
  font-size: 18px;
}

.form-control input {
  font-size: 18px;
  padding: 0 8px;
  height: 24px;
}

.button-box {
  text-align: right;
}

.button-box button {
  height: 32px;
  width: 100px;
  margin: 0 4px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  transition: opacity 0.3s;
}

.button-box button:hover {
  opacity: 0.8;
}

.get {
  background-color: #c0c0c0;
}

.set {
  background-color: #00bfff;
}

.text-box {
  margin-top: 32px;
}

.text-control {
  display: block;
  font-size: 18px;
  margin: 12px 8px;
}
</style>
