<template lang="pug">
  div
    div
      input(type="title" name="title" id="title" placeholder="タイトル" v-model="title")
    div
      input(type="url" name="url" id="url" placeholder="URL" v-model="url")
    div
      input(type="hidden" name="gen_type" value="link")
</template>
    
<script>
  export default {
    props: [],

    data() {
      return {
        title: '',
        url: ''
      }
    },

    mounted() {
      this.$emit('validate', this.isValid);
    },

    watch: {
      title: function(val) {
        this.$emit('validate', this.isValid);
      },

      url: function(val) {
        this.$emit('validate', this.isValid);
      }
    },

    computed: {
      isValid: function() {
        return this.title.length > 0 && this.url.length > 0;
      }
    },

    methods: {

    }
  }
</script>

<style lang="scss" scoped>

</style>
