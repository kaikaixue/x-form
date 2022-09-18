<template>
  <elFormItemWrapper
    :field="field"
    :designer="designer"
    :parentWidget="parentWidget"
    :parentList="parentList"
    :indexOfParentList="indexOfParentList"
  >
    <el-input v-model="fieldModel" />
  </elFormItemWrapper>
</template>

<script>
import elFormItemWrapper from "./el-form-item-wrapper.vue";

export default {
  name: "el-input-widget",
  components: {
    elFormItemWrapper,
  },
  props: {
    field: Object,
    designer: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number
  },
  data() {
    return {
      fieldModel: "",
    };
  },
  created() {
    console.log(this.indexOfParentList)
  },
};
</script>

<style scoped less="scss">
</style>