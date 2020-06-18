<template>
  <div id="app">
    <GoogleMapLoader />
  </div>
</template>

<script>
import GoogleMapLoader from "./components/GoogleMapLoader.vue";

export default {
  name: "App",
  components: {
    GoogleMapLoader
  }
};
</script>
