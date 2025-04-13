import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import 'vuetify/directives'

export const vuetify = createVuetify({
    theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            colors: {
              background: '#FFFFFF',
              primary: '#1976D2',
              secondary: '#424242',
              accent: '#82B1FF',
            },
          },
          dark: {
            colors: {
              background: '#121212',
              primary: '#BB86FC',
              secondary: '#03DAC6',
              accent: '#03DAC6',
            },
          },
        },
      },
})