<template>
  <button type="submit" @click="publishedOrUnpublishedItem" :class="{ publish_button: true, publish_action: !isPublished, unpublish_action: isPublished }">{{ buttonName }}</button>
</template>

<script>
  export default {
    props: ['qrcodeuuid', 'apitoken'],

    data() {
      return {
        data: '',
        isPublished: false,
      }
    },

    created() {

      console.log('uuid: ' + this.qrcodeuuid);
      console.log('apitoken: ' + this.apitoken);

      // qrcode status check
      fetch(`http://localhost:8000/api/v1/qrcode_status/${this.qrcodeuuid}`, {
        headers: { 'Authorization': `Bearer ${this.apitoken}` },
      })
        .then((res) => res.json())
        .then((json) => {

          console.log(`json_: ${JSON.stringify(json)}`);
          this.isPublished = json.is_published;
        })
        .catch((err) => {
          console.log(`err: ${err}`);
        })

    },

    computed: {
      buttonName: function () {
        return this.isPublished ? '非公開にする' : '公開にする';
      }
    },

    methods: {
      publishedOrUnpublishedItem: function () {
        console.log(`click: ${this.isPublished}`)

        // qrcode status check
        const mode = this.isPublished ? "0" : "1"
        fetch(`http://localhost:8000/api/v1/qrcodes/${this.qrcodeuuid}?mode=${mode}`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${this.apitoken}` },
        })
          .then((res) => res.json())
          .then((json) => {

            console.log(`json_: ${JSON.stringify(json)}`);
            this.isPublished = json.is_published;
          })
          .catch((err) => {
            console.log(`err: ${err}`);
          })

      }
    }
  }
</script>

<style lang="scss" scoped>
  .publish_button {
    width: 200px;
    height: 50px;
  }

  .publish_action {
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

  .unpublish_action {
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
