import {
    deepClone,
    getDefaultFormConfig,
    generateId
} from "@/utils/util"

export function createDesigner (vueInstance) {
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

        initDesigner (resetFormJson) {
            this.widgetList = []
            this.formConfig = deepClone(defaultFormConfig)

            if (!resetFormJson) {
                // this.init
            }
        },

        copyNewFieldWidget (origin) {
            let newWidget = deepClone(origin)
            let tempId = generateId()

            newWidget.id = newWidget.type.replace(/-/g, '') + tempId
            newWidget.options.name = newWidget.id
            newWidget.options.label = newWidget.options.label || newWidget.type.toLowerCase()

            delete newWidget.displayName
            return newWidget
        },

        addFieldByDbClick (widget) {
            let newWidget = deepClone(widget)
            this.widgetList.push(newWidget)
        },

        setSelected (selected) {
            if (!selected) {
                this.clearSelected()
                return
            }

            this.selectWidget = selected

            if (selected.id) {
                this.selectedId = selected.id
                this.selectedWidgetName = selected.options.name
            }
        },

        clearSelected () {
            this.selectedId = null
            this.selectedWidgetName = null
            this.selectWidget = {}
        },

        moveUpWidget(parentList, indexOfParentList) {
            if (!parentList) {
                return
            }

            let tempWidget = parentList[indexOfParentList]
            parentList.splice(indexOfParentList, 1)
            parentList.splice(indexOfParentList - 1, 0, tempWidget)
        },

        moveDownWidget(parentList, indexOfParentList) {
            if (!parentList) {
                return
            }

            let tempWidget = parentList[indexOfParentList]
            parentList.splice(indexOfParentList, 1)
            parentList.splice(indexOfParentList + 1, 0, tempWidget)
        },

        removeFieldWidget(parentList, indexOfParentList) {
            if (!parentList) {
                return
            }
    
            let nextSelected = null
    
            if (parentList.length == 1) {
                if (this.parentWidget) {
                    nextSelected = this.parentWidget
                }
            } else if (parentList === (1 + indexOfParentList)) {
                nextSelected = parentList[indexOfParentList - 1]
            } else {
                nextSelected = parentList[indexOfParentList + 1]
            }
    
            parentList.splice(indexOfParentList, 1)
            this.setSelected(nextSelected)
        }
    }
}