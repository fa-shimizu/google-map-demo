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
import { Overlay } from "@/assets/js/overlay.js";
import { kouchiConfig } from "@/assets/js/mapConfig.js";
import KouchiImage from "@/assets/img/kouchi.png";

export default {
  name: "Map",
  data() {
    return {
      apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
      google: null,
      map: null,
      initConfig: kouchiConfig,
      inputConfig: {
        center: {
          lat: null,
          lng: null
        },
        zoom: null
      },
      overlay: null,
      initBounds: {
        leftBottom: {
          lat: kouchiConfig.center.lat - 0.001,
          lng: kouchiConfig.center.lng - 0.001
        },
        rightUpper: {
          lat: kouchiConfig.center.lat + 0.001,
          lng: kouchiConfig.center.lng + 0.001
        }
      },
      overlayImg: KouchiImage
    };
  },
  async mounted() {
    this.google = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    });

    this.map = this.initializeMap();
    this.getMapConfig();

    this.overlay = this.initializeOverlay();
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
    },
    bounds() {
      return new this.google.maps.LatLngBounds(
        new this.google.maps.LatLng(
          this.initBounds.leftBottom.lat,
          this.initBounds.leftBottom.lng
        ),
        new this.google.maps.LatLng(
          this.initBounds.rightUpper.lat,
          this.initBounds.rightUpper.lng
        )
      );
    }
  },
  methods: {
    initializeMap() {
      return new this.google.maps.Map(this.$refs.googleMap, this.initConfig);
    },
    initializeOverlay() {
      Overlay.prototype = new this.google.maps.OverlayView();

      /**
       * onAdd is called when the map's panes are ready and the overlay has been
       * added to the map.
       */
      Overlay.prototype.onAdd = function() {
        const div = document.createElement("div");
        div.style.borderStyle = "none";
        div.style.borderWidth = "0px";
        div.style.position = "absolute";

        // Create the img element and attach it to the div.
        const img = document.createElement("img");
        img.src = this.image_;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.position = "absolute";
        div.appendChild(img);

        this.div_ = div;

        // Add the element to the "overlayLayer" pane.
        const panes = this.getPanes();
        panes.overlayLayer.appendChild(div);
      };

      Overlay.prototype.draw = function() {
        // We use the south-west and north-east
        // coordinates of the overlay to peg it to the correct position and size.
        // To do this, we need to retrieve the projection from the overlay.
        const overlayProjection = this.getProjection();

        // Retrieve the south-west and north-east coordinates of this overlay
        // in LatLngs and convert them to pixel coordinates.
        // We'll use these coordinates to resize the div.
        const sw = overlayProjection.fromLatLngToDivPixel(
          this.bounds_.getSouthWest()
        );
        const ne = overlayProjection.fromLatLngToDivPixel(
          this.bounds_.getNorthEast()
        );

        // Resize the image's div to fit the indicated dimensions.
        const div = this.div_;
        div.style.left = sw.x + "px";
        div.style.top = ne.y + "px";
        div.style.width = ne.x - sw.x + "px";
        div.style.height = sw.y - ne.y + "px";
      };

      // The onRemove() method will be called automatically from the API if
      // we ever set the overlay's map property to 'null'.
      Overlay.prototype.onRemove = function() {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
      };

      return new Overlay(this.bounds, this.overlayImg, this.map);
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
