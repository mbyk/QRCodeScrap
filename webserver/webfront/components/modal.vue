<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <p>{{ title }}</p>
          </div>

          <div class="modal-body">
            {{ body }}
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-cancel-button" @click="cancelAction">
                キャンセル 
              </button>

              <button class="modal-default-button" @click="closeAction">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        body: '',
        eventName: ''
      }
    },
    methods: {
      closeAction() {
        this.$emit('default-action', this.eventName); 
      },
      cancelAction() {
        this.$emit('cancel-action', this.eventName); 
      },

      setupData(title, body, eventName) {
        this.title = title;
        this.body = body;
        this.eventName = eventName;
      }
    }
  }
</script>


<style lang="scss">

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 400px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    border-radius: 5px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }

  .modal-header p {
    margin-top: 0;
    color: #6a737b;
    font-size: 1.6em;
    font-weight: bold;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  .modal-cancel-button {
    background-color: #f3f4f7;
    width: 180px;
    height: 50px;
    border: 1px solid #caccd1;
    border-radius: 5px;
    color: #6a737b;
    font-size: 1.2em;
    font-weight: bold;
    outline: none;
    margin-right: 10px;


    &:hover {
      opacity: 0.8;
    }
  }

  .modal-default-button {
    background-color: #005acc;
    width: 180px;
    height: 50px;
    border: none;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1.2em;
    font-weight: bold;
    outline: none;
    margin-left: 10px;

    &:hover {
      opacity: 0.8;
    }
  }

</style>
  