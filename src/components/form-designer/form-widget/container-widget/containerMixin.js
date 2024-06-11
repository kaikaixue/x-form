export default {
    methods: {
        selectWidget (widget) {
            this.designer.setSelected(widget)
        },

        // 选择父组件
        selectParentWidget () {
            if (this.parentWidget) {
                this.designer.setSelected(this.parentWidget)
            } else {
                this.designer.clearSelected()
            }
        },

        // 复制组件
        cloneContainer (widget) {
            if (this.parentList) {
                let newCon = this.designer.cloneContainer(widget)
                this.parentList.splice(this.indexOfParentList, 0, newCon)
                this.designer.setSelected(newCon)

                this.designer.emitHistoryChange()
            }
        },

        // 删除container
        removeWidget () {
            if (this.parentList) {
                let nextSelected = null
                if (this.parentList.length === 1) {
                    if (this.parentWidget) {
                        nextSelected = this.parentWidget
                    }
                } else if (this.parentList.length === (1 + this.indexOfParentList)) {
                    nextSelected = this.parentList[this.indexOfParentList - 1]
                } else {
                    nextSelected = this.parentList[this.indexOfParentList + 1]
                }

                this.$nextTick(() => {
                    this.parentList.splice(this.indexOfParentList, 1)
                    this.designer.setSelected(nextSelected)

                    this.designer.emitHistoryChange()
                })
            }
        }
    }
}