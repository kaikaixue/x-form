<template>
    <el-scrollbar class="side-scroll-bar">
        <el-collapse class="widget-collapse" value="activeName">
            <el-collapse-item name="容器" title="容器"></el-collapse-item>
            <el-collapse-item
                name="基础字段"
                title="基础字段"
            ></el-collapse-item>
            <el-collapse-item
                name="高级字段"
                title="高级字段"
            ></el-collapse-item>
            <el-collapse-item
                name="自定义字段"
                title="自定义字段"
            ></el-collapse-item>
        </el-collapse>
    </el-scrollbar>
</template>

<script>
export default {
    name: 'widget-panel',
    data() {
        return {
            activeName: ['容器', '基础字段', '高级字段', '自定义字段'],
        }
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
}
</style>
