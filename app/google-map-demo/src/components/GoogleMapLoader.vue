<template>
  <div>
    <div class="map" ref="googleMap" />
  </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";

export default {
  name: "Map",
  data() {
    return {
      google: null,
      mapConfig: {
        center: {
          lat: 35.68944,
          lng: 139.69167
        },
        zoom: 17
      },
      apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY
    };
  },
  async mounted() {
    this.google = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    });
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      new this.google.maps.Map(this.$refs.googleMap, this.mapConfig);
    }
  }
};
</script>

<style scoped>
.map {
  width: 100vw;
  height: 100vh;
}
</style>
