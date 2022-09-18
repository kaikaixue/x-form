<template>
    <div
        class="field-wrapper"
        :class="{ 'design-time-bottom-margin': !!this.designer }"
        :style="{ display: displayStyle }"
    >
        <div
            class="static-content-item"
            :class="[selected ? 'selected' : '']"
            :style="{ display: displayStyle }"
            @click.stop="selectField(field)"
        >
            <slot></slot>
        </div>

        <template v-if="!!this.designer">
            <div class="field-action" v-if="designer.selectedId === field.id">
                <el-icon color="white">
                    <Back />
                </el-icon>
                <el-icon color="white">
                    <Top />
                </el-icon>
                <el-icon color="white">
                    <Bottom />
                </el-icon>
                <el-icon color="white">
                    <Delete />
                </el-icon>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'static-content-wrapper',
    props: {
        field: Object,
        designer: Object,
        displayStyle: {
            type: String,
            default: 'block',
        },
    },
    computed: {
        selected: function () {
            return !!this.designer && this.field.id === this.designer.selectedId
        },
    },
    methods: {
        selectField(field) {
            if (this.designer) {
                this.designer.setSelected(field)
            }
        },
    },
}
</script>

<style scoped lang="scss">
.design-time-bottom-margin {
    margin-bottom: 15px;
}

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
}

.static-content-item {
    min-height: 20px;
    display: flex;
    align-items: center;
}

.static-content-item.selected {
    outline: 2px solid #409eff;
}
</style>
