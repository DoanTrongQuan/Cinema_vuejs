// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify(
  {
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
}
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
)
