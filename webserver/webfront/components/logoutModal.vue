<template>
    modal(v-if="showModal" @close="showModal = false")
      h3(slot="header") custom header
</template>
  
<script>
  import modal from './modal.vue'
  import Vue from 'vue';

  export default {
    data () {
      return {
        showModal: false
      }
    },

    components: {
      'modal': modal
    }
  }
</script>

