<template>
  <div class="field-wrapper">
    <el-form-item :label="field.options.label" @click.stop="selectField(field)">
      <slot></slot>
    </el-form-item>

    <template v-if="this.designer">
      <div class="field-action" v-if="designer.selectedId === field.id">
        <el-icon>
          <Back @click.stop="selectParentWidget(field)" />
        </el-icon>
        <el-icon>
          <Top @click.stop="moveUpWidget" />
        </el-icon>
        <el-icon>
          <Bottom @click.stop="moveDownWidget" />
        </el-icon>
        <el-icon>
          <Delete @click.stop="removeFieldWidget" />
        </el-icon>
      </div>

      <div class="drag-handler" v-if="designer.selectedId === field.id">
        <el-icon>
          <Rank />
        </el-icon>
        {{ field.type }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "el-form-item-wrapper",
  props: {
    field: Object,
    designer: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
  },
  methods: {
    selectField(field) {
      if (this.designer) {
        this.designer.setSelected(field);
      }
    },

    selectParentWidget() {
      if (this.parentWidget) {
        this.designer.setSelected(this.parentWidget);
      } else {
        this.designer.clearSelected();
      }
    },
    moveUpWidget() {
      this.designer.moveUpWidget(this.parentList, this.indexOfParentList);
    },
    moveDownWidget() {
      this.designer.moveDownWidget(this.parentList, this.indexOfParentList);
    },
    removeFieldWidget() {
      this.designer.removeFieldWidget(this.parentList, this.indexOfParentList);
    },
  },
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

  .drag-handler {
    position: absolute;
    top: 0;
    left: -1px;
    height: 20px;
    line-height: 20px;
    opacity: 0.5;
    background: #ff0000;
    z-index: 9;

    el-icon {
      font-size: 12px;
      font-style: normal;
      color: #fff;
      margin: 4px;
      cursor: move;
    }

    &:hover {
      opacity: 1;
      background: #ff0000;
    }
  }
}

.static-content-item {
  min-height: 20px;
  display: flex;
  align-items: center;
}

.el-form-item.selected,
.static-content-item.selected {
  outline: 2px solid #ff0000;
}
</style>