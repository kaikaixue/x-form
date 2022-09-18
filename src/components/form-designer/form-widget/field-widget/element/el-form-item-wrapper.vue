<template>
  <div class="field-wrapper">
    <el-form-item :label="field.options.label" @click.stop="selectField(field)">
      <slot></slot>
    </el-form-item>

    <template v-if="this.designer"> 
        <div class="field-action" v-if="designer.selectedId === field.id">
            <el-icon>
                <Back />
            </el-icon>
            <el-icon>
                <Top />
            </el-icon>
            <el-icon>
                <Bottom />
            </el-icon>
            <el-icon>
                <Delete />
            </el-icon>
        </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "el-form-item-wrapper",
  props: {
    field: Object,
    designer: Object
  },
  methods: {
    selectField(field) {
        if (this.designer) {
            this.designer.setSelected(field)
        }
    }
  }
};
</script>


<style scoped lang="scss">
.field-wrapper {
  position: relative;

  .field-action {
    position: absolute;
    bottom: 0;
    right: -2px;
    height: 22px;
    line-height: 22px;
    background: #ff0000;
    z-index: 9;
  }
}

.static-content-item {
  min-height: 20px;
  display: flex;
  align-items: center;
}

.el-form-item.selected, .static-content-item.selected  {
  outline: 2px solid #ff0000;
}
</style>