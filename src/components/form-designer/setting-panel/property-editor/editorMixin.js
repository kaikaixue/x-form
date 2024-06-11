export default {
    computed: {
        newOptionModel: {
            get () {
                return this.optionModel
            },

            set (newValue) {
                this.$emit('update:this.optionModel', newValue)
            }
        }
    }
}