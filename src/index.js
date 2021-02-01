import './style.scss';

import Vue from 'vue';
import App from './components/App.vue';

document.addEventListener('deviceready', onDeviceReady, false);


function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    document.getElementById('loading').remove();
    document.getElementById('deviceready').style.display = '';

    const app = new Vue({
        el: '#app',
        render: (h) => h(App),
    });
}
