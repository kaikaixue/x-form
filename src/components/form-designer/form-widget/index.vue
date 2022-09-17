<template>
  <div>
    <Draggable
      :list="designer.widgetList"
      :move="checkFieldMove"
      v-bind="{ group: 'dragGroup' }"
      tag="div"
      ghost-class="ghost"
      @start="onDragStart"
      @end="onDragEnd"
      @add="onDragAdd"
      @update="onDragUpdate"
      itemKey="id"
      style="width: 100vw;"
    >
      <template #item="{ element }">
        <component
          :is="getWidgetName(element)"
          :field="element"
          :designer="element"
          :key="element.id"
          :parent-list="designer.widgetList"
          :index-of-parent-list="index"
          :parent-widget="null"
          :design-state="true"
        ></component>
      </template>
    </Draggable>
  </div>
</template>

<script>
import Draggable from "vuedraggable";

export default {
  name: "form-widget",
  props: {
    designer: Object,
  },
  components: {
    Draggable,
  },
  data() {
    return {
    };
  },
  methods: {
    getWidgetName(widget) {
      return widget.type;
    },
    onDragStart() {},
    onDragEnd() {},
    onDragAdd() {
      //   const newIndex = evt.newIndex;
      //   if (this.designer.widgetList[newIndex]) {
      //     this.designer.setSelected(this.designer.widgetList[newIndex]);
      //   }
      //   this.designer.emitHistoryChange();
      //   this.designer.emitEvent("field-selected", null);
    },
    onDragUpdate() {
      // this.designer.emitHistoryChange()
    },
    checkFieldMove() {
      return true;
    },
  },
  watch: {
    "designer.widgetList": {
      deep: true,
      handlder(val) {
        console.log(val);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.container-widget-item,
.field-widget-item {
  display: inline-block;
  height: 28px;
  line-height: 28px;
  width: 115px;
  // float: left;
  padding-left: 6px;
  margin: 0px 6px 0px 0px;
  cursor: move;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  background-color: #f1f2f3;
}
</style>
