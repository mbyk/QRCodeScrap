<template lang="pug">
  div.item-card
    <qrcode-image :imgwidth="cardinfo.imgwidth" :imgheight="cardinfo.imgheight" :qrcodedata="cardinfo.item.base64img"></qrcode-image>
    div.item-card-detail
      div.user_info
        div.user_info_item
          img(src="/images/102_h_hoso.svg" width="20")
        div.user_info_item
          p {{ cardinfo.item.user.username }}
      p.item-card-title {{ cardinfo.item.title }}
</template>

<script>
  import qrcodeImage from './qrcodeImage.vue';

  export default {
    props: {
      cardinfo: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
      }
    },

    components: {
      'qrcode-image': qrcodeImage
    }
  }
</script>

<style lang="scss" scoped>

.item-card {
  width: 30%;
  height: 300px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  float: left;
  margin: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;

  .item-card-detail {
    margin-left: 20px;
    margin-right: 20px;
    .user_info {
      display: flex;
      justify-content: start;
  
      .user_info_item {
        display: inline;
        color: #000000;
        font-weight:bold;
        font-size: 1.0em;
      }
    }

    .item-card-title {
      color: #000000;
    }

  }
}

</style>
