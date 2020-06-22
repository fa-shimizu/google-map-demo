<template>
  <div class="main">
    <div class="info">
      <div class="input-box">
        <p class="position-label">左下</p>
        <span class="form-control">
          <label for="lb-lat">緯度</label>
          <br />
          <input type="text" name="lb-lat" v-model="inputBounds.leftBottom.lat" />
        </span>
        <span class="form-control">
          <label for="lb-lng">経度</label>
          <br />
          <input type="text" name="lb-lng" v-model="inputBounds.leftBottom.lng" />
        </span>
        <p class="position-label">右上</p>
        <span class="form-control">
          <label for="ru-lat">緯度</label>
          <br />
          <input type="text" name="ru-lat" v-model="inputBounds.rightUpper.lat" />
        </span>
        <span class="form-control">
          <label for="ru-lng">経度</label>
          <br />
          <input type="text" name="ru-lng" v-model="inputBounds.rightUpper.lng" />
        </span>
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
import { kouchiMapConfig, kouchiBoundsConfig } from "@/assets/js/mapConfig.js";
import KouchiImage from "@/assets/img/kouchi.png";

export default {
  data() {
    return {
      apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
      google: null,
      map: null,
      initConfig: kouchiMapConfig,
      overlay: null,
      initBounds: kouchiBoundsConfig,
      inputBounds: {
        leftBottom: {
          lat: null,
          lng: null
        },
        rightUpper: {
          lat: null,
          lng: null
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

    this.inputBounds = this.initBounds;
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
  watch: {
    inputBounds: {
      handler(newValue) {
        if (this.overlay !== null) {
          this.overlay.setMap(null);
        }

        this.overlay = this.initializeOverlay(
          this.bounds(newValue),
          this.overlayImg,
          this.map
        );
      },
      deep: true
    }
  },
  methods: {
    initializeMap() {
      return new this.google.maps.Map(this.$refs.googleMap, this.initConfig);
    },
    initializeOverlay(bounds, img, map) {
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

      return new Overlay(bounds, img, map);
    },
    bounds(boundsObj) {
      return new this.google.maps.LatLngBounds(
        new this.google.maps.LatLng(
          boundsObj.leftBottom.lat,
          boundsObj.leftBottom.lng
        ),
        new this.google.maps.LatLng(
          boundsObj.rightUpper.lat,
          boundsObj.rightUpper.lng
        )
      );
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

.position-label {
  font-size: 24px;
  font-weight: bold;
  padding-left: 4px;
  margin: 0;
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

.text-box {
  margin-top: 32px;
}

.text-control {
  display: block;
  font-size: 18px;
  margin: 12px 8px;
}
</style>
