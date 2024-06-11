<template>
    <elFormItemWrapper
        :field="field"
        :designer="designer"
        :parent-widget="parentWidget"
        :parent-list="parentList"
        :index-of-parent-list="indexOfParentList"
    >
        <el-input
            v-model="fieldModel"
            :type="field.options.type"
            :placeholder="field.options.placeholder"
            :size="field.options.size"
        />
    </elFormItemWrapper>
</template>

<script>
import elFormItemWrapper from './el-form-item-wrapper.vue'

export default {
    name: 'el-input-widget',
    components: {
        elFormItemWrapper,
    },
    props: {
        field: Object,
        designer: Object,
        parentWidget: Object,
        parentList: Array,
        indexOfParentList: Number,
    },
    inject: ['formConfig'],
    data() {
        return {
            fieldModel: '',
        }
    },
    created() {},
}
</script>

<style scoped lang="scss">
@import '../../../../../styles/global.scss';
</style>
