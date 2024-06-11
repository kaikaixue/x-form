import Clipboard from 'clipboard'

// 深拷贝
export const deepClone = function (origin) {
    if (origin === undefined) {
        return undefined
    }

    return JSON.parse(JSON.stringify(origin))
}

// 随机生成id
export const generateId = function () {
    return Math.floor(Math.random() * 100000 + Math.random() * 20000 + Math.random() * 5000)
}


// 获取表单默认配置
export function getDefaultFormConfig () {
    return {
        modelName: 'formData',
        refName: 'xForm',
        rulesName: 'rules',
        labelWidth: 80,
        labelPosition: 'left',
        size: '',
        labelAlign: 'label-left-align',
        cssCode: '',
        customClass: '',
        functions: '',
        layoutType: 'PC',

        onFormMounted: '',
        onFormDataChange: ''
    }
}

export const addWindowResizeHandler = function (handler) {
    let oldHandler = window.onresize
    if (typeof window.onresize != 'function') {
        window.onresize = handler
    } else {
        window.onresize = function () {
            oldHandler()
            handler()
        }
    }
}

// 复制到剪贴板
export function copyToClipboard (content, clickEvent, $message, successMsg, errorMsg) {
    const clipboard = new Clipboard(clickEvent.target, {
        text: () => content
    })

    clipboard.on('success', () => {
        $message.success(successMsg)
        clipboard.destroy()
    })

    clipboard.on('error', () => {
        $message.error(errorMsg)
        clipboard.destroy()
    })

    clipboard.onClick(clickEvent)
}

// 获取url ？ 后面的以 ‘&’ 分割，获取 【a】=【b】中的 b，没有匹配的则返回undefined
export function getQueryParam (variable) {
    let query = window.location.search.substring(1)
    let vars = query.split("&")
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=")
        if (pair[0] == variable) {
            return pair[1]
        }
    }

    return undefined
}


// 浅拷贝对象属性，obj2覆盖obj1
export const overwriteObj = function (obj1, obj2) {
    Object.keys(obj2).forEach(prop => {
        obj1[prop] = obj2[prop]
    })
}