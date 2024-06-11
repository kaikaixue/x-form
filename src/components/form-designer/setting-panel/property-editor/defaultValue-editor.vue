<template>
    <el-form-item label="默认值">
        <el-input type="text" v-model="newOptionModel.defaultValue"></el-input>
    </el-form-item>
</template>

<script>
import EditorMixin from './editorMixin'
export default {
    name: 'defaultValue-editor',
    mixins: [EditorMixin],
    props: {
        designer: Object,
        selectedWidget: Object,
        optionModel: Object,
    },
}
</script>

<style lang="scss" scoped></style>
