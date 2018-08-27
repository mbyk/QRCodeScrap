<template lang="pug">
  div.pagination_content
    a(:href="firstPageLink" id="firstPageLink" :class="{ disabled: firstPageDisabled }") 先頭
    a(:href="prevPageLink" id="prevPageLink" :class="{ disabled: firstPageDisabled }") &lt;
    a(:href="nextPageLink" id="nextPageLink" :class="{ disabled: lastPageDisabled }") &gt;
    a(:href="lastPageLink" id="lastPageLink" :class="{ disabled: lastPageDisabled }") 最後
</template>

<script>
  export default {
    props: ['currentpage', 'prevpage', 'nextpage', 'totalpages', 'totalcount', 'linkpath'],

    data() {
      return {
        meta: {
          currentPage: '',
          prevPage: '',
          nextPage: '',
          totalPages: '',
          totalCount: ''
        }
      }
    },

    created() {
      this.meta.currentPage = JSON.parse(this.currentpage);
      this.meta.prevPage = JSON.parse(this.prevpage);
      this.meta.nextPage = JSON.parse(this.nextpage);
      this.meta.totalPages = JSON.parse(this.totalpages);
      this.meta.totalCount = JSON.parse(this.totalcount);
    },

    methods: {
      createItems: function() {
        let datas = []
        if (this.meta.totalPages >= 6) {
          if (this.meta.currentPage >= 3) {
            datas = datas.concat(['...', this.meta.currentPage - 1, this.meta.currentPage]);
          } else {
            for (let i = 1; i <= this.meta.currentPage; i++) {
              datas.push(i);
            }
          }

          const showableLastPage = this.meta.currentPage + 3;
          if (showableLastPage < this.meta.totalPages) {
            for (let i = this.meta.currentPage + 1; i <= showableLastPage; i++) {
              datas.push(i);
            }
            datas.push('...');
          } else {
            for (let i = this.meta.currentPage + 1; i <= this.meta.totalPages; i++) {
              datas.push(i);
            }
          }
        } else {
          for (let i = 1; i <= this.meta.totalPages; i++) {
            datas.push(i);
          }
        }

        return datas;
      }
    },

    mounted() {

      const nextPageElement = document.getElementById('nextPageLink');

      let datas = this.createItems();

      for (let data of datas) {
        const aElement = document.createElement('a');
        aElement.textContent = data;

        if (data !== '...') {
          aElement.setAttribute('href', `${this.linkpath}?page=${data}`);
        }

        if (data === '...') {
          aElement.classList.add('disabled');
        } else if (data === this.meta.currentPage) {
          aElement.classList.add('active');
          aElement.classList.add('disabled');
        }

        nextPageElement.parentNode.insertBefore(aElement, nextPageElement);

      }

    },

    computed: {
      lastPageLink: function () {
        return `${this.linkpath}?page=${this.meta.totalPages}`
      },


      firstPageLink: function () {
        return `${this.linkpath}?page=1`
      },

      prevPageLink: function () {
        const currentPage = this.meta.currentPage;
        const page = currentPage === 1 ? 1 : currentPage - 1;
        return `${this.linkpath}?page=${page}`
      },

      nextPageLink: function () {
        const currentPage = this.meta.currentPage;
        const totalPages = this.meta.totalPages;
        const page = currentPage === totalPages ? totalPages : currentPage + 1;
        return `${this.linkpath}?page=${this.meta.currentPage + 1}`
      },

      lastPageDisabled: function () {
        return this.meta.totalPages === this.meta.currentPage;
      },


      firstPageDisabled: function () {
        return 1 === this.meta.currentPage;
      }

    },

  }
</script>

<style lang="scss">
  .pagination_content {
    display: flex;
    justify-content: center;
    margin-top: 20px;

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

    .active {
      background-color: #005acc;
      color: #ffffff;
    }

    .disabled {
      pointer-events: none;
    }

  }
</style>
  