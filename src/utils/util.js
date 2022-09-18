export const deepClone = function (origin) {
    if (origin === undefined) {
        return undefined
    }

    return JSON.parse(JSON.stringify(origin))
}

export const generateId = function () {
    return Math.floor(Math.random() * 100000 + Math.random() * 20000 + Math.random() * 5000)
}


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