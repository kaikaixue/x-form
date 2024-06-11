// 遍历当前目录和子目录
const requireComponent = require.context('./', true, /\w+\.vue$/)

let comps = {}

requireComponent.keys().map(fileName => {
    let comp = requireComponent(fileName).default
    comps[comp.name] = comp
})

export default comps