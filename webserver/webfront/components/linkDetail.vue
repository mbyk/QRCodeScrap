<template lang="pug">
  div
    div#detail_title
      p {{ qrcode.info.title }}
    div#detail_url
      img(src="/images/125_arr_hoso.svg" width="30" height="30") 
      a(:href="qrcode.info.gen_type_url.url")
        div
          p {{ qrcode.info.gen_type_url.url }}
</template>
        
<script>
  export default {
    props: {
      qrcode: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
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

  #detail_url {
    margin-bottom: 20px;
    border: 4px solid #caccd1;
    padding: 5px;
    display: flex;
    align-items: center;

    a {
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
