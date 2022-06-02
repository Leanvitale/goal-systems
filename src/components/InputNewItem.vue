<template>
    <div>
        <input  v-model="newItem" 
                class="new-todo" 
                type="text" 
                placeholder="Write new todo" 
                @keyup.enter="addItem()"
                ref="inputNew" >
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex';
export default Vue.extend({
    data() {
        return {
            newItem: ''
        }
    },
    mounted() {
      (this.$refs.inputNew as HTMLElement).focus()
    },
    methods: {
        ...mapActions(['ADD_ITEM']),
        addItem() {
            const item = this.newItem.trim();
            
            if (item.length > 0) {
                this.ADD_ITEM(item)
                this.newItem = '';
            }
        }
    }
})
</script>

<style scoped>
    .todoapp input::-webkit-input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    .todoapp input::-moz-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    .todoapp input::input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    .new-todo {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        color: inherit;
        padding: 6px;
        border: 1px solid #999;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    .new-todo {
        padding: 16px 16px 16px 60px;
        border: none;
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    }
    
</style>