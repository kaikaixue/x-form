<template>
    <el-form-item label="占位符">
        <el-input v-model="newOptionModel.placeholder" type="text"></el-input>
    </el-form-item>
</template>

<script>
import EditorMixin from './editorMixin'
export default {
    name: 'placeholder-editor',
    props: {
        optionModel: Object,
        designer: Object,
        selectedWidget: Object,
    },
    mixins: [EditorMixin],
}
</script>

<style lang="scss" scoped></style>
