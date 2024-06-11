<template>
    <el-form-item label="组件大小">
        <el-select v-model="newOptionModel.size">
            <el-option
                v-for="item in sizes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
        </el-select>
    </el-form-item>
</template>

<script>
import EditorMixin from './editorMixin.js'
export default {
    name: 'size-editor',
    props: {
        designer: Object,
        optionModel: Object,
        selectedWidget: Object,
    },
    mixins: [EditorMixin],
    data() {
        return {
            sizes: [
                { label: 'default', value: '' },
                { label: 'large', value: 'large' },
                { label: 'medium', value: 'medium' },
                { label: 'small', value: 'small' },
                { label: 'mini', value: 'mini' },
            ],
        }
    },
}
</script>

<style lang="scss" scoped></style>
