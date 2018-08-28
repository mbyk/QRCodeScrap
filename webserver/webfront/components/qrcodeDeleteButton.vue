<template>
  <button type="submit" @click="confirmAction" :class="{ remove_button: true, remove_action: true }">{{ buttonName }}</button>
</template>

<script>
export default {
  props: ['qrcodeuuid', 'apitoken'],

  data() {
    return {
      data: 'マイリストに追加',
      isRegistered: false,
    }
  },

  created() {

  },

  computed: {
    buttonName: function () {
      return 'データを削除する'
    }
  },

  methods: {

    confirmAction: function() {
      this.$emit('confirm-action');
    },

    remove: function () {

      // mylist registerd check
      fetch(`http://localhost:8000/api/v1/qrcodes/${this.qrcodeuuid}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${this.apitoken}` },
      })
        .then((res) => res.json())
        .then((json) => {

          console.log(`json_: ${JSON.stringify(json)}`);
          if (json.status === 'OK') {
            this.$emit('close-action');
            const backUrl = document.referrer ? document.referrer : '/';
            location.href = backUrl;
            return;
          }
        })
        .catch((err) => {
          console.log(`err: ${err}`);
        })

    }
  }
}
</script>

<style lang="scss" scoped>

  .remove_button {
    width: 200px;
    height: 50px;
  }



  .remove_action {
    background-color: #ff4c4c;
    border: none;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1.2em;
    font-weight: bold;
    outline: none;

    &:hover {
      opacity: 0.8;
    }
  }
</style>

