<template>
    <el-form-item label="显示类型" v-if="selectedWidget.type === 'input'">
        <el-select v-model="newOptionModel.type">
            <el-option label="text" value="text"></el-option>
            <el-option label="password" value="password"></el-option>
        </el-select>
    </el-form-item>
</template>

<script>
import EditorMixin from './editorMixin'
export default {
    name: 'type-editor',
    mixins: [EditorMixin],
    props: {
        designer: Object,
        selectedWidget: Object,
        optionModel: Object,
    },
}
</script>

<style lang="scss" scoped></style>
