<template>
    <div class="field-wrapper">
        <el-form-item
            :label="field.options.label"
            @click.stop="selectField(field)"
            :class="[selected ? 'selected' : '']"
        >
            <slot></slot>
        </el-form-item>

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
    name: 'el-form-item-wrapper',
    props: {
        field: Object,
        designer: Object,
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
