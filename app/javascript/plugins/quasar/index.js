import Vue from 'vue'
import Quasar from 'quasar'
import 'quasar/dist/quasar.sass'
import '@quasar/extras/fontawesome-v5'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'


import iconSet from 'quasar/icon-set/fontawesome-v5'
Vue.use(Quasar, {
    // ...,
    iconSet: iconSet
})