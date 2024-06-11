<template>
    <div class="contain-wrapper">
        <slot></slot>
        <div class="container-action" v-if="designer.selectedId === widget.id">
            <el-icon>
                <Back @click.stop="selectParentWidget(widget)" />
            </el-icon>
            <el-icon v-if="widget.type === 'grid'">
                <CopyDocument @click.stop="cloneContainer(widget)" />
            </el-icon>
            <el-icon>
                <Delete @click.stop="removeWidget" />
            </el-icon>
        </div>
        <div
            class="drag-handler"
            v-if="designer.selectedId === widget.id && !widget.internal"
        >
            <i>{{ widget.title }}</i>
        </div>
    </div>
</template>

<script>
import containerMixin from '@/components/form-designer/form-widget/container-widget/containerMixin.js'
export default {
    name: 'container-wrapper',
    mixins: [containerMixin],
    props: {
        designer: Object,
        widget: Object,
        parentWidget: Object,
        parentList: Array,
        indexOfParentList: Number,
    },
    methods: {},
}
</script>

<style scoped lang="scss">
.contain-wrapper {
    position: relative;
    margin-bottom: 5px;
    .container-action {
        position: absolute;
        bottom: 0;
        right: -2px;
        height: 28px;
        line-height: 28px;
        background: #409eff;
        z-index: 999;
    }

    .drag-handler {
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
            color: #fff;
            margin: 4px;
            cursor: move;
        }
    }
}

.el-icon {
    color: white;
    font-size: 14px;
    margin: 0 5px;
    cursor: pointer;
}
</style>
