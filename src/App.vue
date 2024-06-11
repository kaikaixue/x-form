<template>
    <XFormDesigner :designer-config="designerConfig"></XFormDesigner>
</template>

<script>
import XFormDesigner from './components/form-designer/index.vue'
export default {
    name: 'App',
    data() {
        return {
            designerConfig: {
                resetFormJson: false,
                toolbarMaxWidth: 490,
            },
        }
    },
    components: {
        XFormDesigner,
    },
}
</script>

<style lang="scss">
#app {
    height: 100%;
}
</style>
