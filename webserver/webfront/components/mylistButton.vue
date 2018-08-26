<template>
  <button type="submit" @click="addOrRemoveItem" :class="{ mylist_button: true, add_action: !isRegistered, remove_action: isRegistered }">{{ buttonName }}</button>
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
    console.log('mylist-button created');

    console.log('uuid: ' + this.qrcodeuuid);
    console.log('apitoken: ' + this.apitoken);

    // mylist registerd check
    fetch(`http://localhost:8000/api/v1/mylist_status/${this.qrcodeuuid}`, {
      headers: { 'Authorization': `Bearer ${this.apitoken}` },
    })
      .then((res) => res.json())
      .then((json) => {

        console.log(`json_: ${JSON.stringify(json)}`);
        this.isRegistered = json.is_registered;
      })
      .catch((err) => {
        console.log(`err: ${err}`);
      }) 

  },

  computed: {
    buttonName: function () {
      return this.isRegistered ? 'マイリストから削除' : 'マイリストに追加';
    }
  },

  methods: {
    addOrRemoveItem: function () {
      console.log(`click: ${this.isRegistered}`)

      // mylist registerd check
      const mode = this.isRegistered ? "0" : "1"
      fetch(`http://localhost:8000/api/v1/mylist/${this.qrcodeuuid}?mode=${mode}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${this.apitoken}` },
      })
        .then((res) => res.json())
        .then((json) => {

          console.log(`json_: ${JSON.stringify(json)}`);
          this.isRegistered = json.is_registered;
        })
        .catch((err) => {
          console.log(`err: ${err}`);
        })

    }
  }
}
</script>

<style lang="scss" scoped>

  .mylist_button {
    width: 200px;
    height: 50px;
  }

  .add_action {
    background-color: #fbb030;
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

