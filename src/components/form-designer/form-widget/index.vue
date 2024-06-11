<!-- 中心面板 -->
<template>
    <div class="form-widget-container">
        <el-form class="full-height-width widget-form">
            <div v-if="designer.widgetList.length === 0" class="no-widget-hint">
                请从左侧列表中选择一个组件, 然后用鼠标拖动组件放置于此处
            </div>
            <Draggable
                :list="designer.widgetList"
                :move="checkFieldMove"
                group="dragGroup"
                tag="div"
                ghost-class="ghost"
                @start="onDragStart"
                @end="onDragEnd"
                @add="onDragAdd"
                @update="onDragUpdate"
                itemKey="id"
                class="form-widget-list"
            >
                <template #item="{ element, index }">
                    <template v-if="element.category === 'container'">
                        <component
                            :is="getContainerName(element)"
                            :widget="element"
                            :designer="designer"
                            :key="element.id"
                            :parent-list="designer.widgetList"
                            :index-of-parent-list="index"
                            :parent-widget="null"
                        ></component>
                    </template>
                    <template v-else>
                        <component
                            :is="getWidgetName(element)"
                            :field="element"
                            :designer="designer"
                            :key="element.id"
                            :parentList="designer.widgetList"
                            :indexOfParentList="index"
                            :parentWidget="null"
                            :designState="true"
                        ></component>
                    </template>
                </template>
            </Draggable>
        </el-form>
    </div>
</template>

<script>
import Draggable from 'vuedraggable'
import elementFieldComponents from '@/components/form-designer/form-widget/field-widget/element/index'

export default {
    name: 'form-widget',
    props: {
        designer: Object,
        formConfig: Object,
    },
    inject: ['getDesignerConfig'],
    components: {
        Draggable,
        ...elementFieldComponents,
    },
    provide() {
        return {
            refList: this.widgetRefList,
            formConfig: this.formConfig,
        }
    },
    data() {
        return {
            type: 'el',
            scrollerHeight: 0,
            widgetRefList: {},
        }
    },
    created() {
        this.designer.initDesigner(this.getDesignerConfig().resetFormJson)
    },
    mounted() {},
    methods: {
        getWidgetName(widget) {
            // return widget.type
            return this.type + '-' + widget.type + '-widget'
        },
        getContainerName(widget) {
            return widget.type + '-widget'
        },
        onDragStart() {},
        onDragEnd() {},
        onDragAdd(evt) {
            // console.log(evt)
            const newIndex = evt.newIndex
            if (this.designer.widgetList[newIndex]) {
                this.designer.setSelected(this.designer.widgetList[newIndex])
            }
            this.designer.emitHistoryChange()
            // this.designer.emitEvent('field-selected', null)
        },
        onDragUpdate() {
            this.designer.emitHistoryChange()
        },
        checkFieldMove() {
            return true
        },
    },
    watch: {
        'designer.widgetList': {
            deep: true,
            handler() {
                // val
                // console.log(val)
            },
        },
    },
}
</script>

<style scoped lang="scss">
.container-scroll-bar {
    ::v-deep .el-scrollbar__wrap,
    ::v-deep .el-scrollbar__view {
        overflow-x: hidden;
    }
}

.form-widget-container {
    padding: 10px;
    background-color: #f1f2f3;
    overflow-x: hidden;
    overflow-y: auto;

    .el-form.full-height-width {
        height: 100%;
        padding: 3px;
        background-color: #fff;

        .no-widget-hint {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 18px;
            color: #999999;
        }

        .form-widget-list {
            min-height: calc(100vh - 72px - 68px);
            padding: 3px;
        }
    }

    .el-form.widget-form ::v-deep .el-row {
        padding: 2px;
        border: 1px dashed rgba(170, 170, 170, 0.75);
    }
}
</style>
