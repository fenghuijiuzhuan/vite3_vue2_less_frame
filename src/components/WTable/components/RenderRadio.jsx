import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        checked: Boolean
    },
    render() {
        return <div class="alysa_radiogroup">
            <Radio
                value={this.checked}
                on-on-change={(e) => {
                    this.$emit("handleSelectRadio", e, params.row, params.index)
                    // self.handleSelectRadio(e, params.row, params.index);
                }}
            ></Radio>
        </div>
    }
})
