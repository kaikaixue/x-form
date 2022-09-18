<template>
    <el-container class="main-container full-height">
        <el-header class="main-header">
            <div class="float-left main-title">
                <img src="../../assets/logo.png" />
                <span class="bold">XForm</span>
            </div>
            <div class="float-right">Github</div>
        </el-header>
        <el-container>
            <el-aside class="side-panel">
                <widget-panel :designer="designer" />
            </el-aside>
            <el-container class="center-layout-container">
                <el-header class="toolbar-header">
                    <toolbar-panel></toolbar-panel>
                </el-header>
                <el-main class="form-widget-main">
                    <el-scrollbar
                        class="container-scroll-bar"
                        :style="{ height: scrollerHeight }"
                    >
                        <v-form-widget :designer="designer"></v-form-widget>
                    </el-scrollbar>
                </el-main>
            </el-container>
            <el-aside>
                <setting-panel></setting-panel>
            </el-aside>
        </el-container>
    </el-container>
</template>

<script>
import WidgetPanel from './widget-panel/index.vue'
import SettingPanel from './setting-panel/index.vue'
import ToolbarPanel from './toolbar-panel/index.vue'
import VFormWidget from './form-widget/index.vue'
import { addWindowResizeHandler } from '../../utils/util'

import { createDesigner } from './designer'

export default {
    name: 'XFormDesigner',
    components: {
        WidgetPanel,
        SettingPanel,
        ToolbarPanel,
        VFormWidget,
    },
    data() {
        return {
            designer: createDesigner(),
            scrollerHeight: 0,
        }
    },
    mounted() {
        this.scrollerHeight = window.innerHeight - 72 - 36 + 'px'
        addWindowResizeHandler(() => {
            this.$nextTick(() => {
                this.scrollerHeight = window.innerHeight - 72 - 36 + 'px'
            })
        })
    },
}
</script>

<style scoped lang="scss">
.el-container.main-container {
    background-color: #fff;

    ::v-deep aside {
        margin: 0;
        padding: 0;
        background: inherit;
    }
}

.el-container.full-height {
    height: 100%;
    overflow-y: hidden;
}

.el-header.main-header {
    height: 48px !important;
    border-bottom: 2px dotted #ebeef5;
    line-height: 48px !important;
    min-width: 800px;
}

.float-left {
    float: left;
}

div.main-title {
    font-size: 18px;
    color: #242424;
    display: flex;
    align-items: center;
    justify-items: center;

    img {
        cursor: pointer;
        width: 36px;
        height: 36px;
    }

    span.bold {
        font-size: 20px;
        font-weight: bold;
        margin: 0 6px 0 6px;
    }
}

.float-right {
    float: right;
}

.el-aside.side-panel {
    width: 260px !important;
    overflow: hidden;
}

.el-container.center-layout-container {
    min-width: 680px;
    border-left: 2px dotted #ebeef5;
    border-right: 2px dotted #ebeef5;
}

.el-header.toolbar-header {
    font-size: 14px;
    border-bottom: 1px dotted #cccccc;
    height: 42px !important;
}

.el-main.form-widget-main {
    padding: 0;
    position: relative;
    overflow-x: hidden;
}

.container-scroll-bar {
    ::v-deep .el-scrollbar__wrap,
    ::v-deep .el-scrollbar__view {
        overflow-x: hidden;
    }
}
</style>
