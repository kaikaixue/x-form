<template>
    <el-form-item label="标签" v-if="!noLabelSetting">
        <el-input type="text" v-model="newOptionModel.label"></el-input>
    </el-form-item>
</template>

<script>
import EditorMixin from './editorMixin'
export default {
    name: 'label-editor',
    mixins: [EditorMixin],
    props: {
        designer: Object,
        selectedWidget: Object,
        optionModel: Object,
    },
    computed: {
        noLabelSetting() {
            return (
                this.selectedWidget.type === 'static-text' ||
                this.selectedWidget.type === 'html-text'
            )
        },
    },
}
</script>

<style lang="scss" scoped></style>
