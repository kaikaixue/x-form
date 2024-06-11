<template>
    <div
        class="field-wrapper"
        :class="{ 'design-time-bottom-margin': !!this.designer }"
    >
        <el-form-item
            v-if="!!field.formItemFlag"
            :label="label"
            :label-width="labelWidth + 'px'"
            @click.stop="selectField(field)"
            :class="[selected ? 'selected' : '', labelAlign, customClass]"
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
                <!-- <el-icon>
                    <Rank />
                </el-icon> -->
                <i>{{ field.title }}</i>
            </div>
        </template>
    </div>
</template>

<script>
import FormItemMixin from './formItemMixin.js'
export default {
    name: 'el-form-item-wrapper',
    mixins: [FormItemMixin],
    props: {
        field: Object,
        designer: Object,
        parentWidget: Object,
        parentList: Array,
        indexOfParentList: Number,
    },
    inject: ['formConfig'],
    computed: {
        selected: function () {
            return !!this.designer && this.field.id === this.designer.selectedId
        },

        label: function () {
            if (this.field.options.labelHidden) {
                return ''
            }

            return this.field.options.label
        },

        labelWidth: function () {
            if (this.field.options.labelHidden) {
                return this.designState ? 5 : 0 // 设计期间标签最小宽度为5px，便于鼠标点击
            }

            if (this.field.options.labelWidth) {
                return this.field.options.labelWidth
            }

            if (this.designer) {
                return this.designer.formConfig.labelWidth
            } else {
                return this.formConfig.labelWidth
            }
        },

        labelAlign: function () {
            if (this.field.options.labelAlign) {
                return this.field.options.labelAlign
            }

            if (this.designer) {
                return this.designer.formConfig.labelAlign || 'label-left-align'
            } else {
                return this.formConfig.labelAlign || 'label-left-align'
            }
        },

        customClass: function () {
            return this.field.options.customClass
                ? this.field.options.customClass.join('')
                : ' '
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
            this.designer.emitHistoryChange()
        },
        moveDownWidget() {
            this.designer.moveDownWidget(
                this.parentList,
                this.indexOfParentList,
            )
            this.designer.emitHistoryChange()
        },
    },
}
</script>

<style scoped lang="scss">
@import '../../../../../styles/global.scss';
.field-wrapper {
    position: relative;
    .field-action {
        position: absolute;
        bottom: 0;
        right: -2px;
        height: 22px;
        line-height: 22px;
        background: #409eff;
        z-index: 9;

        .el-icon {
            font-size: 14px;
            color: white;
            margin: 0 5px;
            cursor: pointer;
        }
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

        el-icon,
        i {
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

.design-time-bottom-margin {
    margin-bottom: 5px;
}

.el-form-item {
    position: relative;

    ::v-deep .el-form-item__label {
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    ::v-deep .el-form-item__content {
        //position: unset;  /* TODO: 忘了这个样式设置是为了解决什么问题？？ */
    }

    /* 隐藏Chrome浏览器中el-input数字输入框右侧的上下调整小箭头 */
    ::v-deep .hide-spin-button input::-webkit-outer-spin-button,
    ::v-deep .hide-spin-button input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
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

::v-deep .label-left-align .el-form-item__label {
    justify-content: left;
}

::v-deep .label-center-align .el-form-item__label {
    justify-content: center;
}

::v-deep .label-right-align .el-form-item__label {
    justify-content: right;
}
</style>
