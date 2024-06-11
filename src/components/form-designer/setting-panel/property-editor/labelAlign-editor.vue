<template>
    <el-form-item
        label="对齐方式"
        v-if="!noLabelSetting && selectedWidget.type !== 'button'"
    >
        <el-radio-group v-model="newOptionModel.labelAlign">
            <el-radio-button label="label-left-align">居左</el-radio-button>
            <el-radio-button label="label-center-align">居中</el-radio-button>
            <el-radio-button label="label-right-align">居右</el-radio-button>
        </el-radio-group>
    </el-form-item>
</template>

<script>
import EditorMixin from './editorMixin'
export default {
    name: 'labelAlign-editor',
    mixins: [EditorMixin],
    props: {
        selectedWidget: Object,
        designer: Object,
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
