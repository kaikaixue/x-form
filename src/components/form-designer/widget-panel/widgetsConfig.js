// widget 配置
export const container = [
    {
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
            name: ''
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