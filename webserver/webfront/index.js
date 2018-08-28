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

  created() {
    this.$on('show', function() {
      console.log('show!!!!!!!');
    })
  },

  methods: {
    openModal(eventName, event) {
      if (event) {
        event.preventDefault();
      }

      if (eventName === 'logout') {
        this.$refs.modal.setupData('確認', 'ログアウトしてもよろしいですか？', eventName);
      } else if (eventName === 'delete-qrcode') {
        this.$refs.modal.setupData('確認', '削除してもよろしいですか？', eventName);
      }

      this.showModal = true;
    },

    defaultAction(eventName) {
      if (eventName === 'logout') {
        this.logoutAction();
      } else if (eventName === 'delete-qrcode') {
        this.deleteQrcodeAction();
      }
    },

    cancelAction(eventName) {
      this.showModal = false;
    },

    logoutAction() {
      this.showModal = false;
      location.href = '/logout';
    },
    
    deleteQrcodeAction() {
      this.$refs['delete-button'].remove();
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