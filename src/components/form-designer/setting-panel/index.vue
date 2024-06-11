<template>
  <el-container class="panel-container">
    <el-tabs v-model="activeTab" style="width: 100%; height: 100%; overflow: hidden">
      <!-- 组件设置 -->
      <el-tab-pane label="组件设置" name="1">
        <el-scrollbar class="setting-scrollbar" :style="{ height: scrollerHeight }">
          <!-- 当前选中Field -->
          <template v-if="!!designer.selectedWidget && !designer.selectedWidget.category">
            <el-form class="setting-form">
              <el-collapse v-model="widgetActiveCollapseNames" class="setting-collapse">
                <el-collapse-item name="1" title="常见属性">
                  <template v-for="(editorName, propName) in commonProps" v-bind:key="propName">
                    <component
                      :designer="designer"
                      :selected-widget="selectedWidget"
                      :option-model="optionModel"
                      :is="getPropEditor(propName, editorName)"
                    >
                    </component>
                  </template>
                </el-collapse-item>
                <el-collapse-item name="2" title="高级属性">11</el-collapse-item>
                <el-collapse-item name="3" title="事件属性">1</el-collapse-item>
              </el-collapse>
            </el-form>
          </template>
          <!-- 当前选中Container -->
          <template v-if="!!designer.selectedWidget && !!designer.selectedWidget.category">
            <el-form class="setting-form">
              <el-collapse class="setting-collapse">
                <el-collapse-item title="常见属性"></el-collapse-item>
                <el-collapse-item title="高级属性"></el-collapse-item>
                <el-collapse-item title="事件属性"></el-collapse-item>
              </el-collapse> </el-form
          ></template>
        </el-scrollbar>
      </el-tab-pane>
      <!-- 表单设置 -->
      <el-tab-pane label="表单设置" name="2"> </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script>
import { addWindowResizeHandler } from '@/utils/util'
import WidgetProperties from './propertyRegister'
import PropertyEditors from './property-editor/index'

const { COMMON_PROPERTIES } = WidgetProperties
export default {
  name: 'SettingPanel',
  props: {
    designer: Object,
    selectedWidget: Object,
  },
  components: {
    ...PropertyEditors,
  },
  data() {
    return {
      activeTab: '2',
      scrollerHeight: 0,
      widgetActiveCollapseNames: ['1', '3'],

      commonProps: COMMON_PROPERTIES,
    }
  },
  watch: {
    'designer.selectedWidget': {
      handler(val) {
        if (val) {
          this.activeTab = '1'
        }
      },
    },
  },
  mounted() {
    if (!this.designer.selectedWidget) {
      this.activeTab = '2'
    } else {
      this.activeTab = '1'
    }

    this.scrollerHeight = window.innerHeight - 96 - 36 + 'px'
    addWindowResizeHandler(() => {
      this.$nextTick(() => {
        this.scrollerHeight = window.innerHeight - 96 - 36 + 'px'
      })
    })
  },
  computed: {
    optionModel: {
      get() {
        return this.selectedWidget.options
      },

      set(newValue) {
        // this.selectedWidget.options = newValue
        this.$emit[('update:this.selectedWidget.options', newValue)]
      },
    },
  },
  methods: {
    // 获取属性修改器
    getPropEditor(propName, editorName) {
      // 去掉组件名称前缀-，如果有的话
      let originalPropName = propName.replace(this.selectedWidget.type + '-', '')
      let ownOriginalPropName = `${this.selectedWidget.type}-${originalPropName}-editor}`
      if (this.$options.components[ownOriginalPropName]) {
        return ownOriginalPropName
      }

      return this.$root.$options.components[ownOriginalPropName] ? ownOriginalPropName : editorName
    },
  },
}
</script>

<style scoped lang="scss">
.panel-container {
  padding: 0 8px;
}

.setting-scrollbar {
  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}

.setting-form {
  ::v-deep .el-form-item__label {
    font-size: 13px;
    overflow: hidden;
    white-space: nowrap;
  }

  ::v-deep .el-form-item--mini.el-form-item {
    margin-bottom: 6px;
  }
}

.setting-collapse {
  ::v-deep .el-collapse-item__content {
    padding-bottom: 6px;
  }

  ::v-deep .el-collapse-item__header {
    font-style: italic;
    font-weight: bold;
  }
}
</style>
