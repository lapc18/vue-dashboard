import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        primary: '#9652ff',
        success: '#3cd1c2',
        info: '#ffaa2c'
    },
    icons: {
        iconfont: 'mdi'
    }
});
