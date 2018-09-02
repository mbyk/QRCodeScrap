<template lang="pug">
   div
    div#detail_title
      p {{ qrcode.info.title }}
    div#detail_map
      img(src="/images/compass_hoso.svg" width="30" height="30") 
      span {{ qrcode.info.gen_type_map.address }}
    div#map_preview
      iframe(:src="previewUrl" class="map-top" width="400" height="400" allowfullscreen="")
</template>
      
<script>
  export default {
    props: {
      qrcode: {
        type: Object,
        required: true
      },
      apikey: {
        type: String,
        required: true
      }
    },

    data() {
      return {
      }
    },

    computed: {
      previewUrl: function() {
        return `https://www.google.com/maps/embed/v1/place?key=${this.apikey}&q=${this.encodedAddress}`
      },
      
      encodedAddress: function() {
        return encodeURIComponent(this.qrcode.info.gen_type_map.address);
      }
      
    },

    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  #detail_title {
    margin-bottom: 20px;
  }

  #detail_map {
    margin-bottom: 20px;
    border: 4px solid #caccd1;
    padding: 5px;
    display: flex;
    align-items: center;
  }

  #map_preview {
    margin-bottom: 20px;
  }
</style>
