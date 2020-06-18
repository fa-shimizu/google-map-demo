<template>
  <div class="main"></div>
</template>

<script>
export default {
  name: "GoogleMapComponent",
  data() {
    return {
      apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY
    };
  }
};
</script>

<style scoped>
</style>
