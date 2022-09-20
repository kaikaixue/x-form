<template>
    <div class="field-wrapper">
        <el-form-item
            :label="field.options.label"
            @click.stop="selectField(field)"
            :class="[selected ? 'selected' : '']"
        >
            <slot></slot>
        </el-form-item>

        <template v-if="this.designer">
            <div class="field-action" v-if="designer.selectedId === field.id">
                <el-icon color="white">
                    <Back @click.stop="selectParentWidget(field)" />
                </el-icon>
                <el-icon color="white">
                    <Top @click.stop="moveUpWidget" />
                </el-icon>
                <el-icon color="white">
                    <Bottom @click.stop="moveDownWidget" />
                </el-icon>
                <el-icon color="white">
                    <Delete @click.stop="removeFieldWidget" />
                </el-icon>
            </div>

            <div class="drag-handler" v-if="designer.selectedId === field.id">
                <el-icon>
                    <Rank />
                </el-icon>
                {{ field.type }}
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'el-form-item-wrapper',
    props: {
        field: Object,
        designer: Object,
        parentWidget: Object,
        parentList: Array,
        indexOfParentList: Number,
    },
    computed: {
        selected: function () {
            console.log(this.designer.widgetList)
            return !!this.designer && this.field.id === this.designer.selectedId
        },
    },
    methods: {
        selectField(field) {
            if (this.designer) {
                this.designer.setSelected(field)
            }
        },
        selectParentWidget() {
            if (this.parentWidget) {
                this.designer.setSelected(this.parentWidget)
            } else {
                this.designer.clearSelected()
            }
        },
        moveUpWidget() {
            this.designer.moveUpWidget(this.parentList, this.indexOfParentList)
        },
        moveDownWidget() {
            this.designer.moveDownWidget(
                this.parentList,
                this.indexOfParentList,
            )
        },
        removeFieldWidget() {
            this.designer.removeFieldWidget(
                this.parentList,
                this.indexOfParentList,
            )
        },
    },
}
</script>

<style scoped lang="scss">
.field-wrapper {
    position: relative;
    .field-action {
        position: absolute;
        bottom: 0;
        right: -2px;
        height: 22px;
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        line-height: 22px;
        background: #409eff;
        z-index: 9;
    }

    .drag-handler {
        position: absolute;
        top: 0;
        left: -1px;
        height: 20px;
        line-height: 20px;
        opacity: 0.5;
        background: #409eff;
        z-index: 9;

        el-icon {
            font-size: 12px;
            font-style: normal;
            color: #fff;
            margin: 4px;
            cursor: move;
        }

        &:hover {
            opacity: 1;
            background: #409eff;
        }
    }
}

.static-content-item {
    min-height: 20px;
    display: flex;
    align-items: center;
}

.el-form-item.selected,
.static-content-item.selected {
    outline: 2px solid #409eff;
}
</style>
