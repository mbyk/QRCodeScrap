<template lang="pug">
  div#select_map
    div
      input(type="title" name="title" id="title" placeholder="タイトル" v-model="title")
    div#qrcode_type_map_address
      input(type="title" name="address" id="address" placeholder="住所" v-model="address")
    button.preview_button(@click="preview") Preview
    div#qrcode_type_map_container
    div
      input(type="hidden" name="gen_type" value="map")
</template>
      
<script>
  export default {
    props: [],

    data() {
      return {
        title: '',
        address: '',
        apikey: ''
      }
    },

    mounted() {
      this.$emit('validate', this.isValid);
      this.apikey = $('#category-select').data('apikey');
    },


    watch: {
      title: function(val) {
        this.$emit('validate', this.isValid);
      },

      address: function(val) {
        this.$emit('validate', this.isValid);
      }
    },

    computed: {
      isValid: function() {
        return this.title.length > 0 && this.address.length > 0;
      }
    },

    methods: {

      preview: function(e) {
        e.preventDefault();

        if (this.address === '') {
          return;
        }

        const mapContainer = document.getElementById('qrcode_type_map_container');
        while (mapContainer.firstChild) {
          mapContainer.removeChild(mapContainer.firstChild);
        }

        const encodedAddress = encodeURIComponent(this.address);

        const iframe = document.createElement('iframe');
        iframe.setAttribute('class', 'map-top');
        iframe.setAttribute('width', '300');
        iframe.setAttribute('height', '200');
        iframe.setAttribute('src', `https://www.google.com/maps/embed/v1/place?key=${this.apikey}&q=${encodedAddress}`);
        iframe.setAttribute('allowfullscreen', '');
        mapContainer.appendChild(iframe);
      }
    }
  }
</script>

<style lang="scss" scoped>

  #select_map {

    #qrcode_type_map_container {
      margin-top: 20px;
    }

    #qrcode_type_map_address {
      margin-bottom: 10px;
    }

    .preview_button {
      background-color: #7ac143;
      border: none;
      border-radius: 5px;
      color: #ffffff;
      font-size: 0.8em;
      font-weight: bold;
      outline: none;
      padding: 10px;

      &:hover {
        opacity: 0.8;
      }
     }
  
  }

</style>
