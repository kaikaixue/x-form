<template>
    <el-scrollbar class="side-scroll-bar">
        <el-collapse class="widget-collapse" value="activeName">
            <el-collapse-item name="容器" title="容器">
                <Draggable
                    tag="ul"
                    :list="container"
                    :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                    :clone="handleBasicFieldWidgetClone"
                    ghost-class="ghost"
                    :sort="false"
                    :move="checkFieldMove"
                    itemKey="id"
                    style="padding: 3px"
                    @end="onBasicFieldDragEnd"
                >
                    <template #item="{ element }">
                        <div
                            class="container-widget-item"
                            :title="element.title"
                            @dblclick="addFieldByDbClick(element)"
                        >
                            <span>
                                <el-icon
                                    style="
                                        vertical-align: middle;
                                        margin-right: 3px;
                                    "
                                    ><Loading
                                /></el-icon>
                                {{ element.title }}
                            </span>
                        </div>
                    </template>
                </Draggable>
            </el-collapse-item>
            <el-collapse-item name="基础字段" title="基础字段"
                ><Draggable
                    tag="ul"
                    :list="basicFields"
                    :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                    :clone="handleBasicFieldWidgetClone"
                    ghost-class="ghost"
                    :sort="false"
                    :move="checkFieldMove"
                    itemKey="id"
                    style="padding: 3px"
                    @end="onBasicFieldDragEnd"
                >
                    <template #item="{ element }">
                        <div
                            class="container-widget-item"
                            :title="element.title"
                            @dblclick="addFieldByDbClick(element)"
                        >
                            <span>
                                <el-icon
                                    style="
                                        vertical-align: middle;
                                        margin-right: 3px;
                                    "
                                    ><Loading
                                /></el-icon>
                                {{ element.title }}
                            </span>
                        </div>
                    </template>
                </Draggable>
            </el-collapse-item>
            <el-collapse-item name="高级字段" title="高级字段"
                ><Draggable
                    tag="ul"
                    :list="advancedFields"
                    :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                    :clone="handleBasicFieldWidgetClone"
                    ghost-class="ghost"
                    :sort="false"
                    :move="checkFieldMove"
                    itemKey="id"
                    style="padding: 3px"
                    @end="onBasicFieldDragEnd"
                >
                    <template #item="{ element }">
                        <div
                            class="container-widget-item"
                            :title="element.title"
                            @dblclick="addFieldByDbClick(element)"
                        >
                            <span>
                                <el-icon
                                    style="
                                        vertical-align: middle;
                                        margin-right: 3px;
                                    "
                                    ><Loading
                                /></el-icon>
                                {{ element.title }}
                            </span>
                        </div>
                    </template>
                </Draggable></el-collapse-item
            >
            <el-collapse-item name="自定义字段" title="自定义字段">
                <Draggable
                    tag="ul"
                    :list="customFields"
                    :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                    :clone="handleBasicFieldWidgetClone"
                    ghost-class="ghost"
                    :sort="false"
                    :move="checkFieldMove"
                    itemKey="id"
                    style="padding: 3px"
                    @end="onBasicFieldDragEnd"
                >
                    <template #item="{ element }">
                        <div
                            class="container-widget-item"
                            :title="element.title"
                            @dblclick="addFieldByDbClick(element)"
                        >
                            <span>
                                <el-icon
                                    style="
                                        vertical-align: middle;
                                        margin-right: 3px;
                                    "
                                    ><Loading
                                /></el-icon>
                                {{ element.title }}
                            </span>
                        </div>
                    </template>
                </Draggable></el-collapse-item
            >
        </el-collapse>
    </el-scrollbar>
</template>

<script>
import Draggable from 'vuedraggable'
import {
    container,
    basicFields,
    advancedFields,
    customFields,
} from './widgetsConfig'
export default {
    name: 'widget-panel',
    props: {
        designer: Object,
    },
    components: {
        Draggable,
    },
    data() {
        return {
            activeName: ['容器', '基础字段', '高级字段', '自定义字段'],
            container,
            basicFields,
            advancedFields,
            customFields,
        }
    },
    mounted() {
        this.loadWidgets()
    },
    methods: {
        loadWidgets() {
            this.basicFields = basicFields
        },
        handleBasicFieldWidgetClone(origin) {
            return this.designer.copyNewFieldWidget(origin)
        },
        addFieldByDbClick(widget) {
            this.designer.addFieldByDbClick(widget)
        },
        checkFieldMove() {
            return true
        },
        onBasicFieldDragEnd(evt) {
            // this.designer.widgetList.splice(evt.newDraggableIndex, 1)
            console.log(evt)
        },
    },
}
</script>

<style scoped lang="scss">
.el-scrollbar.side-scroll-bar {
    ::v-deep .el-scrollbar__wrap {
        overflow-x: hidden;
    }
}

.widget-collapse {
    border-top-width: 0px;

    ::v-deep .el-collapse-item__header {
        margin-left: 8px;
        font-style: italic;
        font-weight: bold;
    }

    .container-widget-item,
    .field-widget-item {
        display: inline-block;
        height: 28px;
        line-height: 28px;
        width: 115px;
        // float: left;
        padding-left: 6px;
        margin: 0px 6px 0px 0px;
        cursor: move;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        background-color: #f1f2f3;
    }
}
</style>
