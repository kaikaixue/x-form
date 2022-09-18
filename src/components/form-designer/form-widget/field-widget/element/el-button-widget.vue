<template>
  <staticContentWrapper>
    <el-button
      :size="field.options.size"
      :type="field.options.type"
      :plain="field.options.plain"
      :text="field.options.text"
      :bg="field.options.bg"
      :link="field.options.link"
      :round="field.options.round"
      :circle="field.options.circle"
      :loading="field.options.loading"
      :loading-icon="field.options.loadingIcon"
      :disabled="field.options.disable"
      :icon="field.options.icon"
      :autofocus="field.options.autofocus"
      :nativeType="field.options.nativeType"
      :autoInsertSpace="field.options.autoInsertSpace"
    >
      {{ field.options.label }}
    </el-button>
  </staticContentWrapper>
</template>

<script>
import staticContentWrapper from "../static-content-wrapper.vue";

export default {
  name: "el-button-widget",
  components: {
    staticContentWrapper,
  },
  props: {
    field: Object,
  },
};
</script>

<style scoped less="csss">
</style>