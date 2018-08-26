import './style.css';
import mylistButton from './components/mylistButton.vue'
import deleteButton from './components/qrcodeDeleteButton.vue'
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

const deleteButtonlement = document.getElementById('delete_button');
if (deleteButtonlement) {
  new Vue({
    el: '#delete_button',
    components: {
      'delete-button': deleteButton
    }
  });
} 
