import './style.css';
import mylistButton from './components/mylistButton.vue'
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
