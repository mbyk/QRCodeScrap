import './style.css';
import mylistButton from './components/mylistButton.vue'
import qrcodeImage from './components/qrcodeImage.vue'
import Vue from 'vue';

const mylistButtonElement = document.getElementById('mylist_button');
if (mylistButtonElement) {
  new Vue({
    el: '#mylist_button',
    components: {
      'mylist-button': mylistButton
    }
  });
} 

const qrcodeListElement = document.getElementById('qrcode_list');
if (qrcodeListElement) {
  new Vue({
    el: '#qrcode_list',
    components: {
      'qrcode-image': qrcodeImage
    }
  });
} 

