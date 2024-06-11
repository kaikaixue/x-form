<template>
    <div class="ace-container">
        <div class="ace-editor" ref="ace"></div>
    </div>
</template>

<script>
import ace from 'ace-builds'
// import 'ace-builds/webpack-resolver'
import 'ace-builds/src-min-noconflict/theme-sqlserver'
import 'ace-builds/src-min-noconflict/mode-javascript' // 默认设置的语言模式
import 'ace-builds/src-min-noconflict/mode-json' //
import 'ace-builds/src-min-noconflict/mode-css' //
export default {
    name: 'CodeEditor',
    props: {
        value: {
            type: String,
            required: true,
        },
        readOnly: {
            type: Boolean,
            default: false,
        },
        mode: {
            type: String,
            default: 'javascript',
        },
        userWorker: {
            //是否开启语法检查，默认开启
            type: Boolean,
            default: true,
        },
    },
    mounted() {
        // ace.config.set('basePath', '/')
        // ace.config.set('loadWorkerFromBlob', false)

        this.aceEditor = ace.edit(this.$refs.ace, {
            maxLines: 20, // 最大行，超过出现滚动条
            minLines: 5, // 最小行，不够会自动伸缩
            fontSize: 12,
            theme: this.themePath,
            mode: this.modePath, // 默认设置的语言模式
            tabSize: 2, // 制表符设置为2个空格大小
            readOnly: this.readOnly,
            highlightActiveLine: true, // 高亮选中的行
            value: this.codeValue,
        })

        this.aceEditor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true, // 设置代码片段提示
            enableLiveAutocompletion: true, // 设置自动提示
        })

        if (this.mode === 'json') {
            this.setJsonMode()
        }

        if (!this.userWorker) {
            this.aceEditor.getSession().setUseWorker(false)
        }

        //编辑时同步数据
        this.aceEditor.getSession().on('change', () => {
            // this.$emit('update:value', this.aceEditor.getValue()) // 触发更新事件, 实现.sync双向绑定！！
            this.$emit('update:value', this.aceEditor.getValue())
        })
    },
    data() {
        return {
            aceEditor: null,
            codeValue: this.value,
            themePath: 'ace/theme/sqlserver', // 不导入 webpack-resolver，该模块路径会报错
            modePath: 'ace/mode/javascript',
        }
    },
    methods: {
        setJsonMode() {
            this.aceEditor.getSession().setMode('ace/mode/json')
        },
    },
}
</script>

<style scoped></style>
