<template>
  <div class="img-container">
    <img :width="imgwidth" :height="imgheight" :src="img_base64"/>
  </div>
</template>
  
<script>
  export default {
    props: ['qrcodedata', 'imgwidth', 'imgheight'],

    data() {
      return {
        img_base64: 'data:image/png;base64,'
      }
    },

    created() {
      this.img_base64 = 'data:image/png;base64,' + this.qrcodedata;

      // // mylist registerd check
      // fetch(`http://localhost:8000/api/v1/qrcode/generate?mode=base64&qrcode_data=${this.qrcodedata}`)
      //   .then((res) => res.json())
      //   .then((json) => {

      //     console.log(`json_: ${JSON.stringify(json)}`);
      //     this.img_base64 = 'data:image/png;base64,' + json.content;
      //   })
      //   .catch((err) => {
      //     console.log(`err: ${err}`);
      //   })
    }

 }
</script>

<style lang="scss" scoped>
  .img-container {
    text-align: center;
  }
</style>
