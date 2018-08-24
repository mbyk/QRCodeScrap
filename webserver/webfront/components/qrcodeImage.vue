<template>
  <img width=200 height=200 :src="img_base64"/>

</template>
  
<script>
  export default {
    props: ['qrcodedata'],

    data() {
      return {
        img_base64: 'data:image/png;base64,'
      }
    },

    created() {
      console.log('qrcode-image created');
      console.log('qrcodedata: ' + this.qrcodedata);

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
</style>
