import {
    deepClone,
    getDefaultFormConfig,
    generateId
} from "@/utils/util"

export function createDesigner(vueInstance) {
    let defaultFormConfig = deepClone(getDefaultFormConfig())

    return {
        widgetList: [],
        formConfig: {
            cssCode: ''
        },

        selectedId: null,
        selectWidget: null,
        selectedWidgetName: null,
        vueInstance: vueInstance,

        formWidget: null,

        cssClassList: [],

        historyData: {
            index: -1,
            maxStep: 20,
            steps: []
        },

        initDesigner(reseFormJson) {
            this.widgeList = []
            this.formConfig = deepClone(defaultFormConfig)

            if (!reseFormJson) {
                // this.init
            }
        },

        copyNewFieldWidget(origin) {
            let newWidget = deepClone(origin)
            let tempId = generateId()

            newWidget.id = newWidget.type.replace(/-/g, '') + tempId
            newWidget.options.name = newWidget.id
            newWidget.options.label = newWidget.options.label || newWidget.type.toLowerCase()

            delete newWidget.displayName
            return newWidget
        },

        addFieldByDbClick(widget) {
            let newWidget = deepClone(widget)

            this.widgeList.push(newWidget)  
        }
    }
}