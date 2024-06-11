export default {
    methods: {
        removeFieldWidget () {
            if (this.parentList) {
                let nextSelected = null
                if (this.parentList.length === 1) {
                    if (this.parentWidget !== null) {
                        nextSelected = this.parentWidget
                    }
                } else if (
                    this.parentList.length ===
                    1 + this.indexOfParentList
                ) {
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
        },
    }
}