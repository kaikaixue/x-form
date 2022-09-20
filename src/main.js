import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

const requireComponent = require.context('/src/components/form-designer/form-widget/container-widget', false, /\w+\.vue$/)

requireComponent.keys().map(fileName => {
    let comp = requireComponent(fileName).default
    app.component(comp.name, comp)
})

app.use(ElementPlus)

app.mount('#app')
