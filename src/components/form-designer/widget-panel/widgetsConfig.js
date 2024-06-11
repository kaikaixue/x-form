// widget 配置
export const container = [
    {
        id: 100,
        type: 'grid',
        category: 'container',
        icon: 'grid',
        title: '栅格',
        cols: [],
        options: {
            name: '',
            hidden: false,
            gutter: 12, // 栅格间隔,
            colHeight: null,
            customClass: ''
        }
    },
    {
        id: 101,
        type: 'grid-col',
        category: 'container',
        icon: 'grid-col',
        internal: true, // 是否内部
        widgetList: [],
        options: {
            name: '',
            hidden: false,
            span: 12,   // 栅格占据的列数
            offset: 0,  // 栅格左侧的间隔格数
            push: 0, // 栅格向右移动格数
            pull: 0, // 栅格向左移动格数
            responsive: false, // 响应？？？
            md: 12,   // 响应式栅格数
            sm: 12,
            xs: 12,
            customClass: '', // 自定义css类名
        }
    }
]

export const basicFields = [
    {
        id: 1,
        type: 'input',
        title: '单行输入',
        icon: 'text-field',
        formItemFlag: true,
        options: {
            name: '',
            label: '输入框',
            labelWidth: null,
            labelAlign: 'label-left-align',
            columnWidth: '200px',
            customClass: '',
            type: 'text',
            defaultValue: '',
            placeholder: '',
            size: ''
        }
    },
    {
        id: 2,
        type: 'button',
        title: '按钮',
        icon: 'el-icon-phone-outline',
        formItemFlag: false,
        options: {
            name: '',
            size: '',
            type: '',
            plain: false,
            text: false,
            bg: false,
            link: false,
            round: false,
            circle: false,
            loading: false,
            loadingIcon: 'Loading',
            disabled: false,
            icon: '',
            autofocus: false,
            nativeType: 'button',
            autoInsertSpace: ''
        }
    }
]

export const advancedFields = [
    {
        id: 3,
        type: 'input',
        title: '单行输入',
        icon: 'el-icon-phone-outline',
        formItemFlag: true,
        options: {
            name: ''
        }
    },
]

export const customFields = [
    {
        id: 4,
        type: 'input',
        title: '单行输入',
        icon: 'el-icon-phone-outline',
        formItemFlag: true,
        options: {
            name: ''
        }
    },
]