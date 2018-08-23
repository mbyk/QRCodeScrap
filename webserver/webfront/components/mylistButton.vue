<template>
  <button type="submit" class="mylist_button">{{ buttonName }}</button>
</template>

<script>
export default {
  props: ['qrcodeuuid', 'apitoken'],

  data() {
    return {
      data: 'マイリストに追加',
      isRegistered: false
    }
  },

  created() {
    console.log('mylist-button created');

    // mylist registerd check
    fetch(`http://localhost:8000/api/v1/mylist_status/${this.qrcodeuuid}`, {
      headers: { 'Authorization': `Bearer: ${this.apitoken}` }
    })
      .then((res) => res.json)
      .then((json) => {

        console.log(`json_: ${JSON.stringify(json)}`);
        this.isRegistered = json.isRegistered;
      })
      .catch((err) => {
        console.log(`err: ${err}`);
      }) 

  },

  computed: {
    buttonName: function () {
      return this.isRegistered ? 'マイリストから削除' : 'マイリストに追加';
    }
  }
}
</script>

<style lang="scss" scoped>

  .mylist_button {
    width: 200px;
    height: 50px;
  }
</style>

