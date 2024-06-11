import {
    deepClone,
    getDefaultFormConfig,
    generateId,
    overwriteObj
} from "@/utils/util"
import { advancedFields, basicFields, container, customFields } from './widget-panel/widgetsConfig'

export function createDesigner(vueInstance) {
    let defaultFormConfig = deepClone(getDefaultFormConfig())

    return {
        widgetList: [],
        formConfig: {
            cssCode: ''
        },

        selectedId: null,
        selectedWidget: null,
        selectedWidgetName: null,
        vueInstance: vueInstance,

        formWidget: null,

        cssClassList: [],

        historyData: {
            index: -1,
            maxStep: 20,
            steps: []
        },

        initDesigner(resetFormJson) {
            this.widgetList = []
            this.formConfig = deepClone(defaultFormConfig)

            if (!resetFormJson) {
                this.initHistoryData()
            }
        },

        copyNewContainerWidget (origin) {
            let newCon = deepClone(origin)
            newCon.id = newCon.type.replace(/-/g, '') + generateId()
            newCon.options.name = newCon.id
            if (newCon.type === 'grid') {
                let newCol = deepClone(this.getContainerByType('grid-col'))
                let tmpId = generateId()
                newCol.id = 'grid-col-' + tmpId
                newCol.options.name = 'gridCol' + tmpId
                newCon.cols.push(newCol)
                newCol = deepClone(newCol)
                tmpId = generateId()
                newCol.id = 'grid-col-' + tmpId
                newCol.options.name = 'gridCol' + tmpId
                newCon.cols.push(newCol)
            }
            console.log(this.widgetList)
            delete newCon.displayName
            return newCon
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

        addFieldByDbClick(widget) {
            let newWidget = deepClone(widget)
            this.widgetList.push(newWidget)
        },

        setSelected(selected) {
            if (!selected) {
                this.clearSelected()
                return
            }
            this.selectedWidget = selected
            console.log(this.selectedWidget)

            if (selected.id) {
                this.selectedId = selected.id
                this.selectedWidgetName = selected.options.name
            }
        },

        clearSelected() {
            this.selectedId = null
            this.selectedWidgetName = null
            // this.selectedWidget = {}
            this.selectedWidget = null
        },

        // 克隆容器
        cloneContainer (containerWidget) {
            if (containerWidget.type === 'grid') {
                let newGrid = deepClone(this.getContainerByType('grid'))
                newGrid.id = newGrid.type + generateId()
                newGrid.options.name = newGrid.id
                containerWidget.cols.forEach(gridCol => {
                    let newGridCol = deepClone(this.getContainerByType('grid-col'))
                    let tmpId = generateId()
                    newGridCol.id = 'grid-col-' + tmpId
                    newGridCol.options.name = 'gridCol' + tmpId
                    newGridCol.options.span = gridCol.options.span
                    newGrid.cols.push(newGridCol)
                })
                return newGrid
            }
        },

        // 克隆栅格列
        cloneGridCol (widget, parentWidget) {
            console.log(parentWidget)
            let newGridCol = deepClone(this.getContainerByType('grid-col'))
            console.log(newGridCol)
            newGridCol.options.span = widget.options.span
            let tmpId = generateId()
            newGridCol.id = 'grid-col-' + tmpId
            newGridCol.options.name = 'gridCol' + tmpId

            parentWidget.cols.push(newGridCol)
        },

        moveUpWidget (parentList, indexOfParentList) {
            if (!parentList) {
                return
            }

            let tempWidget = parentList[indexOfParentList]
            parentList.splice(indexOfParentList, 1)
            parentList.splice(indexOfParentList - 1, 0, tempWidget)
        },

        moveDownWidget (parentList, indexOfParentList) {
            if (!parentList) {
                return
            }

            let tempWidget = parentList[indexOfParentList]
            parentList.splice(indexOfParentList, 1)
            parentList.splice(indexOfParentList + 1, 0, tempWidget)
        },

        // 弃用
        removeFieldWidget (parentList, indexOfParentList) {
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
        },

        getContainerByType (typeName) {
            let allWidgets = [...container, ...basicFields, ...advancedFields, ...customFields]
            let foundCon = null
            allWidgets.forEach(con => {
                if (!!con.category && !!con.type && (con.type === typeName)) {
                    foundCon = con
                }
            })
            return foundCon
        },

        // 获取导入JSON模板
        getImportTemplate () {
            return {
                widgetList: [],
                formConfig: deepClone(defaultFormConfig)
            }
        },

        // 加载导入的JSON
        loadFormJson (formJson) {
            let modifiedFlag = false

            if (formJson && formJson.widgetList) {
                this.widgetList = formJson.widgetList
                modifiedFlag = true
            }

            if (formJson && formJson.formConfig) {
                overwriteObj(this.formConfig, formJson.formConfig)
                // this.formConfig = formJson.formConfig
                modifiedFlag = true
            }

            if (modifiedFlag) {
                this.emitEvent('form-json-imported', [])
            }

            return modifiedFlag
        },

        // 兄弟组件发射事件
        emitEvent (evtName, evtData) {
            this.vueInstance.$emit(evtName, evtData)
        },

        // 保存表单内容到浏览器Storage
        saveFormConfigToStorage () {
            window.localStorage.setItem('widget__list__backup', JSON.stringify(this.widgetList))
            window.localStorage.setItem('form__config__backup', JSON.stringify(this.formConfig))
        },

        // 从localStorage加载表单数据
        loadFormContentFromStorage () {
            let widgetListBackup = window.localStorage.getItem('widget__list__backup')
            if (widgetListBackup) {
                this.widgetList = JSON.parse(widgetListBackup)
            }

            let formConfigBackup = window.localStorage.getItem('form__config__backup')
            if (formConfigBackup) {
                this.formConfig = JSON.parse(formConfigBackup)
            }
        },

        // 初始化历史记录数据
        initHistoryData () {
            this.loadFormContentFromStorage()
            this.historyData.index++
            this.historyData.steps[this.historyData.index] = ({
                widgetList: deepClone(this.widgetList),
                formConfig: deepClone(this.formConfig)
            })
        },

        // 发出历史记录改变事件
        emitHistoryChange () {
            if (this.historyData.index === this.historyData.maxStep - 1) {
                this.historyData.steps.shift()
            } else {
                this.historyData.index++
            }

            this.historyData.steps[this.historyData.index] = ({
                widgetList: deepClone(this.widgetList),
                formConfig: deepClone(this.formConfig)
            })

            this.saveFormConfigToStorage()
        },

        // 回退
        undoHistoryStep () {
            if (this.historyData.index !== 0) {
                this.historyData.index--
            }

            this.widgetList = deepClone(this.historyData.steps[this.historyData.index].widgetList)
            this.formConfig = deepClone(this.historyData.steps[this.historyData.index].formConfig)
        },

        // 前进
        redoHistoryStep () {
            if (this.historyData.index !== (this.historyData.steps.length - 1)) {
                this.historyData.index++
            }

            this.widgetList = deepClone(this.historyData.steps[this.historyData.index].widgetList)
            overwriteObj(this.formConfig, this.historyData.steps[this.historyData.index].formConfig)
        },

        // 清空formWidget
        clearDesigner (skipHistoryChange) {
            let emptyWidgetListFlag = (this.widgetList.length === 0)
            this.widgetList = []
            this.selectedId = null
            this.selectedWidget = null
            this.selectedWidgetName = null
            overwriteObj(this.formConfig, defaultFormConfig)

            if (skipHistoryChange) {
                // 什么也不做
            } else if (!emptyWidgetListFlag) {
                this.emitHistoryChange()
            } else {
                // aa
            }
        }
    }
}