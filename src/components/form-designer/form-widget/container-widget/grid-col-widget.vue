<template>
    <el-col
        v-if="widget.type === 'grid-col'"
        class="grid-cell"
        v-bind="layoutProps"
        :class="[selected ? 'selected' : '']"
        :key="widget.id"
        @click.stop="selectWidget(widget)"
    >
        <Draggable
            :list="widget.widgetList"
            group="dragGroup"
            ghostClass="ghost"
            animation="200"
            :itemKey="widget.id"
        >
            <template #item="{ element, index }">
                <template v-if="'container' === element.category">
                    <component
                        :is="element.type + '-widget'"
                        :widget="element"
                        :designer="designer"
                        :key="element.id"
                        :parent-list="widget.parentList"
                        :index-of-parent-list="index"
                        :parent-widget="widget"
                        class="form-widget-list"
                    >
                    </component>
                </template>
                <template v-else>
                    <component
                        :is="'el-' + element.type + '-widget'"
                        :field="element"
                        :designer="designer"
                        :key="element.id"
                        :parent-list="widget.parentList"
                        :index-of-parent-list="index"
                        :parent-widget="widget"
                        :design-state="true"
                    >
                    </component>
                </template>
            </template>
        </Draggable>
        <div
            class="grid-col-action"
            v-if="
                designer.selectedId === widget.id && widget.type === 'grid-col'
            "
        >
            <el-icon>
                <Back @click.stop="selectParentWidget(widget)" />
            </el-icon>
            <el-icon>
                <Top @click.stop="moveUpWidget" />
            </el-icon>
            <el-icon>
                <Bottom @click.stop="moveDownWidget" />
            </el-icon>
            <el-icon>
                <CopyDocument @click.stop="cloneContainer(widget)" />
            </el-icon>
            <el-icon>
                <Delete @click.stop="removeWidget" />
            </el-icon>
        </div>
        <div
            class="grid-col-handler"
            v-if="
                designer.selectedId === widget.id && widget.type === 'grid-col'
            "
        >
            <i>栅格列</i>
        </div>
    </el-col>
</template>

<script>
import Draggable from 'vuedraggable'
import containerMixin from '@/components/form-designer/form-widget/container-widget/containerMixin'
import FieldComponents from '@/components/form-designer/form-widget/field-widget/element/index'
export default {
    name: 'grid-col-widget',
    components: { Draggable, ...FieldComponents },
    mixins: [containerMixin],
    props: {
        designer: Object,
        widget: Object,
        parentList: Array,
        parentWidget: Object,
        indexOfParentList: Number,
        colHeight: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            layoutProps: {
                span: this.widget.options.span || 12,
                // md: this.widget.options.md || 12,
                // sm: this.widget.options.sm || 12,
                // xs: this.widget.options.xs || 12,
                offset: this.widget.options.offset || 0,
                push: this.widget.options.push || 0,
                pull: this.widget.options.pull || 0,
            },
        }
    },
    computed: {
        selected() {
            return this.widget.id === this.designer.selectedId
        },
    },
    methods: {
        selectWidget(widget) {
            this.designer.setSelected(widget)
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
        cloneContainer(widget) {
            this.designer.cloneGridCol(widget, this.parentWidget)
        },
    },
}
</script>

<style lang="scss" scoped>
.grid-cell {
    min-height: 38px;
    padding: 3px;
    outline: 1px dashed #336699;
    position: relative;
    margin-bottom: 5px;

    .form-widget-list {
        min-height: 28px;
    }

    .grid-col-action {
        position: absolute;
        bottom: 0;
        right: -2px;
        height: 28px;
        line-height: 28px;
        background-color: #409eff;
        z-index: 999;
        .el-icon {
            font-size: 14px;
            color: white;
            margin: 0 5px;
            cursor: pointer;
        }
    }

    .grid-col-handler {
        position: absolute;
        top: -2px;
        left: -2px;
        height: 22px;
        line-height: 22px;
        background-color: #409eff;
        z-index: 9;

        i {
            font-size: 14px;
            font-style: normal;
            color: white;
            margin: 4px;
            cursor: default;
        }
    }
}
</style>
