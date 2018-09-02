import './style.css';
import mylistButton from './components/mylistButton.vue'
import deleteButton from './components/qrcodeDeleteButton.vue'
import qrcodeImage from './components/qrcodeImage.vue'
import pagination from './components/pagination.vue'
import modal from './components/modal.vue'
import publishButton from './components/qrcodePublishButton.vue'
import cardItem from './components/cardItem.vue'
import categorySelect from './components/categorySelect.vue'
import qrcodeTypeLink from './components/qrcodeTypeLink.vue'
import qrcodeTypeMap from './components/qrcodeTypeMap.vue'
import linkDetail from './components/linkDetail.vue'
import mapDetail from './components/mapDetail.vue'
import config from '../config'

const routes = [
  { path: '/link', component: qrcodeTypeLink },
  { path: '/map', component: qrcodeTypeMap }
]

const router = new VueRouter({
  routes
});

import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  data: {
    showModal: false,
    newPostValidated: false
  },

  created() {
    this.$on('show', function() {
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
    },

    validatePostData(isValid) {
      this.newPostValidated = isValid;
    }
  },
  components: {
    'mylist-button': mylistButton,
    'qrcode-image': qrcodeImage,
    'delete-button': deleteButton,
    'publish-button': publishButton,
    'pagination': pagination,
    'card-item': cardItem,
    'modal': modal,
    'category-select': categorySelect,
    'link-detail': linkDetail,
    'map-detail': mapDetail
  }
});
