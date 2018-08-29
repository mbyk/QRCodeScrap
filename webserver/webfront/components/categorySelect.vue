<template lang="pug">
  div.select_type_area
    div(id="select_type" @click="selectType" :class="{ open: isOpen }")
      div CATEGORY
      img(src="/images/arr_down_hoso.svg")
    ul#select_type_list
      li(@click="selectLink")
        a(href="#") リンク
      li(@click="selectMap")
        a(href="#") 地図
</template>

<script>
  export default {
    props: [],

    data() {
      return {
        isOpen: false
      }
    },

    mounted() {

    },

    methods: {
      selectType: function() {
        if (!this.isOpen) {
          $('#select_type_list').stop().slideDown('fast');
        } else {
          $('#select_type_list').stop().slideUp('fast');
        }
        this.isOpen = !this.isOpen;
      },

      selectLink: function() {
        $('#select_type_list').stop().slideUp('fast');
        this.isOpen = false;
      },

      selectMap: function() {
        $('#select_type_list').stop().slideUp('fast');
        this.isOpen = false;
      }
    }
  }
</script>

<style lang="scss" scoped>


  .open {
    -webkit-border-bottom-left-radius: 0 !important;
    -moz-border-radius-bottomleft: 0 !important;
    border-bottom-right-radius: 0 !important;
    -webkit-border-bottom-right-radius: 0 !important;
    -moz-border-radius-bottomright: 0 !important;
  }

  .select_type_area {
  
    #select_type {
      width: 304px;
      height: 60px;
      background-color: #005acc;
      border-radius: 5px;
      border: none;
      position: relative;
      color: #ffffff;
      display: table-cell;
      vertical-align: middle;
      padding-left: 20px;

      img {
        position: absolute;
        width: 10px;
        height: 10px;
        right: 10px;
        top: 25px;
      }
    }

    #select_type_list {

      padding: 0;
      margin: 0;
      display: none;

      li {
        list-style: none;
        margin: 0;
        padding: 0;
        height: 60px;
        background-color: #005acc;

        a {
          display: block;
          padding: 20px 10px 20px 20px;
          color: #ffffff;
          text-decoration: none;
          height: 60px;
          box-sizing: border-box;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          display: block;

          &:hover {
            border-left: 4px solid #ffdd00;
            opacity: 1;
          }

        }

        &:last-child {
          -webkit-border-bottom-left-radius: 5px !important;
          -moz-border-radius-bottomleft: 5px !important;
          border-bottom-right-radius: 5px !important;
          -webkit-border-bottom-right-radius: 5px !important;
          -moz-border-radius-bottomright: 5px !important;
        }
      }
    }
  }
</style>
  