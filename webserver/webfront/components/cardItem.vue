<template lang="pug">
  div.item-card
    <qrcode-image :imgwidth="cardinfo.imgwidth" :imgheight="cardinfo.imgheight" :qrcodedata="cardinfo.item.base64img"></qrcode-image>
    div.qrcode-type-icon
      img(src="/images/125_arr_hoso.svg")
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
  margin: 12px;
  padding: 12px;
  background-color: #ffffff;
  border-radius: 10px;
  position: relative;

  .qrcode-type-icon {
    position: absolute;
    right: -10px;
    top: -10px;
    width: 40px;
    height: 40px;
    padding: 3px;
    border-radius: 50%;
    border: 1px solid #6a737b;
    background-color: #f3f4f7;
  }

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
