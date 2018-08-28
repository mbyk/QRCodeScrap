import './style.css';
import mylistButton from './components/mylistButton.vue'
import deleteButton from './components/qrcodeDeleteButton.vue'
import qrcodeImage from './components/qrcodeImage.vue'
import pagination from './components/pagination.vue'
import modal from './components/modal.vue'
import Vue from 'vue';

new Vue({
  el: '#app',
  data: {
    showModal: false
  },

  methods: {
    openModal(eventName, event) {
      event.preventDefault();

      if (eventName === 'logout') {
        this.$refs.modal.setupData('確認', 'ログアウトしてもよろしいですか？');
      }

      this.showModal = true;
    },

    defaultAction(eventName) {
      if (eventName === 'logout') {
        this.logoutAction();
      }
    },

    cancelAction(eventName) {
      this.showModal = false;
    },

    logoutAction() {
      this.showModal = false;
      location.href = '/logout';
    }

  },
  components: {
    'mylist-button': mylistButton,
    'qrcode-image': qrcodeImage,
    'delete-button': deleteButton,
    'pagination': pagination,
    'modal': modal
  }
});