<template lang="pug">
  a(href="/?page=1" id="firstPageLink") 先頭
</template>
  
<script>
  export default {
    props: ['currentpage', 'prevpage', 'nextpage', 'totalpages', 'totalcount'],

    data() {
      return {
      }
    },

    created() {

    },

    mounted() {

    },

  computed: {
    lastPageLink: function () {
      return `/?page=${this.meta.totalPages}` 
    },

    prevPageLink: function () {
      const currentPage = this.meta.currentPage;
      const page = currentPage === 1 ? 1 : currentPage - 1;
      return `/?page=${page}` 
    },

    nextPageLink: function () {
      const currentPage = this.meta.currentPage;
      const totalPages = this.meta.totalPages;
      const page = currentPage === totalPages ? totalPages : currentPage + 1;
      return `/?page=${this.meta.currentPage+1}` 
    }


  },

  }
</script>

<style lang="scss" scoped>
  a {
    float: left;
    list-style: none;
    padding: 5px;
    border: 1px solid #caccd1; 

    width: 60px;
    height: 60px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: #ffffff;
    border-radius: 5px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    color: #6a737b;
    text-decoration: none;

    &:hover {
      background-color: #005acc;
      opacity: 1;
      color: #ffffff;
    }

  }
</style>
  