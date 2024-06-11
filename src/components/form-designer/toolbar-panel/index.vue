<template>
    <div class="toolbar-container">
        <div class="left-toolbar">
            <el-icon color="#409eff">
                <Back @click.stop="undoHistory" />
            </el-icon>
            <el-icon color="#409eff">
                <Right @click.stop="redoHistory" />
            </el-icon>
        </div>
        <div class="right-toolbar">
            <div
                class="right-toolbar-con"
                :style="{ width: toolbarWidth + 'px' }"
            >
                <el-button
                    v-if="showToolButton('clearDesignerButton')"
                    text
                    type="primary"
                    link
                    @click="clearFormWidget"
                >
                    <el-icon style="margin-right: 5px"><Delete /></el-icon>
                    清空
                </el-button>
                <el-button
                    v-if="showToolButton('previewFormButton')"
                    text
                    type="primary"
                    link
                    @click="previewForm"
                >
                    <el-icon style="margin-right: 5px"><View /></el-icon>
                    预览
                </el-button>
                <el-button
                    v-if="showToolButton('exportCodeButton')"
                    type="primary"
                    text
                    link
                    @click="exportCode"
                    >导出代码</el-button
                >
                <el-button
                    v-if="showToolButton('importJsonButton')"
                    type="primary"
                    text
                    link
                    @click="importJson"
                    >导入Json</el-button
                >
                <el-button
                    v-if="showToolButton('exportJsonButton')"
                    type="primary"
                    text
                    link
                    @click="exportJson"
                    >导出Json</el-button
                >
            </div>
        </div>

        <!-- 预览面板对话框 -->
        <el-dialog
            title="预览"
            center
            width="65%"
            v-model="showPreviewDialogFlag"
            class="small-padding-dialog"
        >
        </el-dialog>

        <!-- 导出代码 -->
        <el-dialog
            title="导出代码"
            v-model="showExportCodeDialogFlag"
            v-if="showExportCodeDialogFlag"
            width="65%"
            center
            class="small-padding-dialog"
        >
            <el-tabs v-model="activeCodeTab">
                <el-tab-pane label="Vue" name="vue">
                    <code-editor
                        v-model:value="vueCode"
                        :mode="'vue'"
                        :read-only="true"
                        :userWorker="false"
                    ></code-editor>
                </el-tab-pane>
                <el-tab-pane label="HTML" name="html">
                    <code-editor
                        v-model:value="htmlCode"
                        :mode="'html'"
                        :read-only="true"
                        :userWorker="false"
                    ></code-editor>
                </el-tab-pane>
            </el-tabs>
            <template #footer>
                <el-button type="primary" @click="copyVueCode"
                    >复制Vue代码</el-button
                >
                <el-button type="primary" @click="copyHtmlCode"
                    >复制HTML代码</el-button
                >
                <el-button @click="saveVueCode">保存Vue文件</el-button>
                <el-button @click="saveHtmlCode">保存HTML文件</el-button>
                <el-button @click="showExportCodeDialogFlag = false"
                    >关闭</el-button
                >
            </template>
        </el-dialog>

        <!-- 导入JSON -->
        <el-dialog
            title="导入JSON"
            v-model="showImportJsonDialogFlag"
            width="65%"
            center
            class="small-padding-dialog"
        >
            <el-alert
                type="info"
                title="导入的JSON内容须符合下述格式，以保证顺利导入"
                show-icon
                class="alert-padding"
            ></el-alert>
            <code-editor
                :mode="'json'"
                :read-only="false"
                v-model:value="importTemplate"
                @update:value="importTemplate = $event"
            ></code-editor>
            <template #footer>
                <el-button type="primary" @click="doJsonImport">导入</el-button>
                <el-button @click="showImportJsonDialogFlag = false"
                    >取消</el-button
                >
            </template>
        </el-dialog>

        <!-- 导出JSON -->
        <el-dialog
            title="导入JSON"
            v-model="showExportJsonDialogFlag"
            width="65%"
            center
            class="small-padding-dialog"
        >
            <code-editor
                :mode="'json'"
                :read-only="true"
                v-model:value="jsonContent"
            ></code-editor>
            <template #footer>
                <el-button type="primary" @click="copyFormJson"
                    >复制JSON</el-button
                >
                <el-button @click="saveFormJson">保存为文件</el-button>
                <el-button @click="showExportJsonDialogFlag = false"
                    >关闭</el-button
                >
            </template>
        </el-dialog>
    </div>
</template>

<script>
import CodeEditor from '@/components/code-editor/index.vue'
import { generateCode } from '@/utils/code-generator.js'
import {
    deepClone,
    copyToClipboard,
    generateId,
    getQueryParam,
} from '@/utils/util'
import { saveAs } from 'file-saver'
export default {
    name: 'toolbar-panel',
    props: {
        designer: Object,
    },
    components: { CodeEditor },
    data() {
        return {
            showPreviewDialogFlag: false, // 控制预览对话框
            showExportCodeDialogFlag: false, // 控制导出代码对话框
            showImportJsonDialogFlag: false, // 控制导入Json对话框
            showExportJsonDialogFlag: false, // 控制导出Json对话框

            designerConfig: this.getDesignerConfig(),
            toolbarWidth: 420,
            vueCode: '',
            htmlCode: '',

            importTemplate: '', // 导入模板

            jsonContent: '', // JSON内容
            jsonRawContent: '', // JSON原始内容

            activeCodeTab: 'vue',
        }
    },

    inject: ['getDesignerConfig'],

    computed: {
        formJson() {
            return {
                widgetList: deepClone(this.designer.widgetList),
                formConfig: deepClone(this.designer.formConfig),
            }
        },
    },

    methods: {
        // 工具栏按钮是否显示
        showToolButton(configName) {
            if (this.designerConfig[configName] === undefined) {
                return true
            }

            return this.designerConfig[configName]
        },

        // 回退
        undoHistory() {
            this.designer.undoHistoryStep()
        },

        // 前进
        redoHistory() {
            this.designer.redoHistoryStep()
        },

        // 清空
        clearFormWidget() {
            this.designer.clearDesigner()
        },

        // 预览
        previewForm() {
            this.showPreviewDialogFlag = true
        },

        // 导出代码
        exportCode() {
            this.htmlCode = generateCode(this.formJson, 'html')
            this.vueCode = generateCode(this.formJson, 'vue')
            this.showExportCodeDialogFlag = true
        },

        // 复制Vue代码
        copyVueCode(e) {
            copyToClipboard(
                this.vueCode,
                e,
                this.$message,
                '复制成功',
                '复制失败',
            )
        },

        // 复制HTML代码
        copyHtmlCode(e) {
            copyToClipboard(
                this.htmlCode,
                e,
                this.$message,
                '复制成功',
                '复制失败',
            )
        },

        // 保存Vue文件
        saveVueCode() {
            this.saveAsFile(this.vueCode, `xForm${generateId()}.vue`)
        },

        // 保存HTML文件
        saveHtmlCode() {
            this.saveAsFile(this.htmlCode, `xForm${generateId()}.html`)
        },

        // 保存文件
        saveAsFile(content, name) {
            this.$prompt('保存为文件', '文件名', {
                inputValue: name,
                closeOnClickModal: false,
                inputPlaceholder: '请输入文件名',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            })
                .then(({ value }) => {
                    if (!value) {
                        value = name
                    }
                    if (getQueryParam('vscode') == 1) {
                        this.vsSaveFile(value, content)
                        return
                    }

                    const fileBlob = new Blob([content], {
                        type: 'text/plain;charset=utf-8',
                    })
                    saveAs(fileBlob, value)
                })
                .catch()
        },

        // vscode保存文件
        vsSaveFile(fileName, fileContent) {
            const msgObj = {
                cmd: 'writeFile',
                data: {
                    fileName,
                    code: fileContent,
                },
            }
            window.parent.postMessage(msgObj, '*')
        },

        // 导入Json
        importJson() {
            this.importTemplate = JSON.stringify(
                this.designer.getImportTemplate(),
                null,
                '  ',
            )
            this.showImportJsonDialogFlag = true
        },

        // 确认导入
        doJsonImport() {
            try {
                let importObj = JSON.parse(this.importTemplate)
                console.log(importObj)
                this.designer.loadFormJson(importObj)

                this.showImportJsonDialogFlag = false
                this.$message.success('导入JSON成功')

                this.designer.emitHistoryChange()

                this.designer.emitEvent('form-json-imported', [])
            } catch (ex) {
                this.$message.error(ex + '')
            }
        },

        // 导出JSON
        exportJson() {
            let widgetList = deepClone(this.designer.widgetList)
            let formConfig = deepClone(this.designer.formConfig)

            this.jsonContent = JSON.stringify(
                { widgetList, formConfig },
                null,
                '  ',
            )

            this.jsonRawContent = JSON.stringify({ widgetList, formConfig })

            this.showExportJsonDialogFlag = true
        },

        // 复制JSON
        copyFormJson(e) {
            copyToClipboard(
                this.jsonRawContent,
                e,
                this.$message,
                '复制成功',
                '复制失败',
            )
        },

        // 保存JSON到文件
        saveFormJson() {
            this.saveAsFile(this.jsonContent, `xForm${generateId()}.json`)
        },
    },
}
</script>

<style scoped lang="scss">
div.toolbar-container {
    height: 100%;
    line-height: 40px;
}

.left-toolbar {
    float: left;
    font-size: 16px;
}

.el-icon {
    margin-right: 16px;
    cursor: pointer;
}

.right-toolbar {
    float: right;
    text-align: right;
    overflow: hidden;

    .right-toolbar-con {
        text-align: left;
        width: 600px;
    }
}

.small-padding-dialog {
    ::v-deep .el-dialog__header {
        background: #f1f2f3;
    }

    ::v-deep .el-dialog__body {
        padding: 12px 15px 12px 15px;

        .el-alert.alert-padding {
            padding: 0 10px;
        }
    }

    ::v-deep .ace-container {
        border: 1px solid #dcdfe6;
    }
}
</style>
