<template>
    <container-wrapper
        :designer="designer"
        :widget="widget"
        :parent-widget="parentWidget"
        :parent-list="parentList"
        :index-of-parent-list="indexOfParentList"
    >
        <el-row
            :key="widget.id"
            :gutter="widget.options.gutter"
            class="grid-container"
            :class="[selected ? 'selected' : '']"
            @click.stop="selectWidget(widget)"
        >
            <template
                v-for="(colWidget, colIdx) in widget.cols"
                :key="colWidget.id"
            >
                <grid-col-widget
                    :designer="designer"
                    :widget="colWidget"
                    :parent-list="widget.cols"
                    :index-of-parent-list="colIdx"
                    :parent-widget="widget"
                    :col-height="widget.options.colHeight"
                >
                </grid-col-widget>
            </template>
        </el-row>
    </container-wrapper>
</template>

<script>
import ContainerWrapper from '@/components/form-designer/form-widget/container-widget/container-wrapper.vue'
import GridColWidget from '@/components/form-designer/form-widget/container-widget/grid-col-widget.vue'
import containerMixin from '@/components/form-designer/form-widget/container-widget/containerMixin'
export default {
    name: 'grid-widget',
    mixins: [containerMixin],
    components: [ContainerWrapper, GridColWidget],
    props: {
        designer: Object,
        widget: Object,
        parentWidget: Object,
        parentList: Array,
        indexOfParentList: Number,
    },
    computed: {
        selected() {
            return this.widget.id === this.designer.selectedId
        },
    },
    methods: {},
}
</script>

<style lang="scss" scoped>
.el-row.grid-container {
    min-height: 50px;
    outline: 1px dashed #336699;
}

.grid-container.selected,
.grid-cell.selected {
    outline: 2px solid #409eff !important;
}
</style>
