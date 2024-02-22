import vue from 'vue'
import vuetify from 'vuetify/lib'

vue.use(vuetify)

export default new vuetify({
  icons: {
    iconfont: 'mdisvg', // 'mdi' || 'mdisvg' || 'md' || 'fa' || 'fa4' || 'fasvg'
  },
})