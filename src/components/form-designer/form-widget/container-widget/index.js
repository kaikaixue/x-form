// import Vue from 'vue'
// import app from '@/main'

// const requireComponent = require.context('./', false, /\w+\.vue$/)

/**
 * 容器组件时递归组件，且内部可以嵌套其他容器，局部注册会找不到组件，必须注册为全局组件，原因不明？！
 * begin
 *
let comps = {}

requireComponent.keys().map(fileName => {
  let comp = requireComponent(fileName).default;
  comps[comp.name] = comp
})

export default comps;

end */

/* 全局注册！！ */
// requireComponent.keys().map(fileName => {
//   let comp = requireComponent(fileName).default
//   app.component(comp.name, comp)
// })
