<template>
    <ul class="todo-list">
        <li :class="{'completed': item.isCompleted, 'editing': isEditing }" 
            :contenteditable="isEditing && key === idEditing"
            @blur="saveEditing(item, key, $event)"
            @keyup.enter="saveEditing(item, key, $event)"
            @keyup.esc="restoreEditing(key, $event)"
            :id="'li-' + key"
            v-for="(item, key) in listFiltered" :key="item.name" >

            <input  type="checkbox" :name="'toggle-' + key" class="toggle" 
                    :checked="item.isCompleted" 
                    @click="changeStatus(key)" 
                    :disabled="isEditing"
                    v-if="!(isEditing && key === idEditing)" >

            <label :for="'toggle-' + key" :class="{'edit': key === idEditing}" @dblclick="activeEditing(key)">
                <span>{{ item.name }}</span>
                <span class="destroy" @click="deleteItem(item)" v-if="!isEditing"></span>
            </label>

        </li>
    </ul>
</template>

<script lang="ts">
import { IEditItem, ITodoItem } from '../utils/utils'
import Vue from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex'
export default Vue.extend({
    computed: {
        ...mapState(['todosList', 'isEditing', 'route']),
        ...mapGetters(['listFiltered']),
    },
    data() {
        return {
            idEditing: null as unknown as number
        }
    },
    methods: {
        ...mapActions(['CHANGE_ITEM_STATUS', 'REMOVE_ITEM', 'CHANGE_EDITING_STATUS', 'CHANGE_ITEM_NAME']),
        changeStatus(key: number) {
            this.CHANGE_ITEM_STATUS(key)
        },
        deleteItem(item: ITodoItem) {
            this.REMOVE_ITEM(item)
        },
        activeEditing(key: number) {
            if ( this.todosList[key].isCompleted ) return

            this.idEditing = key
            this.CHANGE_EDITING_STATUS(true)
        },
        saveEditing(item: ITodoItem, key: number, event: InputEvent) {
            if ( !this.isEditing ) return
            
            const input = event.target as HTMLElement
            let newValue = input.innerText.trim()
            
            if ( newValue.length === 0 ) {
                this.REMOVE_ITEM(item)
            } else if ( this.todosList[key].name !== newValue ) {
                const payload: IEditItem = {
                    id: key,
                    name: newValue
                }
                this.CHANGE_ITEM_NAME(payload)
            }

            // Fix Press Enter insert element
            const lastChild = input.lastChild as Node
            if ( input.children.length > 1 ) {
                input.removeChild(lastChild)
            }

            this.cancelEditing()
        },
        restoreEditing(key: number, event: InputEvent) {
            // Revert content Child
            const input = event.target as HTMLElement
            const childrens = input.children as HTMLCollection;
            (childrens[0] as HTMLElement).innerText = this.todosList[key].name
            
            this.cancelEditing()
        },
        cancelEditing() {
            this.idEditing = null as unknown as number
            this.CHANGE_EDITING_STATUS(false)
        }
    }
})
</script>

<style scoped>
    .todo-list {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .todo-list li {
        position: relative;
        font-size: 24px;
        border-bottom: 1px solid #ededed;
    }

    .todo-list li:last-child {
        border-bottom: none;
    }

    .todo-list li.editing {
        border-bottom: none;
        padding: 0;
    }

    .todo-list li.editing .edit {
        display: block;
        width: 506px;
        padding: 12px 16px;
        margin: 0 0 0 43px;
    }

    .todo-list li.editing .view {
        display: none;
    }

    .todo-list li .toggle {
        text-align: center;
        width: 40px;
        /* auto, since non-WebKit browsers doesn't support input styling */
        height: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none; /* Mobile Safari */
        -webkit-appearance: none;
        appearance: none;
    }

    .todo-list li .toggle {
        opacity: 0;
    }

    .todo-list li .toggle + label {
        /*
            Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
            IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
        */
        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
        background-repeat: no-repeat;
        background-position: center left;
    }

    .todo-list li .toggle:checked + label {
        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
    }

    .todo-list li label {
        word-break: break-all;
        padding: 15px 15px 15px 60px;
        display: block;
        line-height: 1.2;
        transition: color 0.4s;
    }

    .todo-list li.completed label {
        color: #d9d9d9;
        text-decoration: line-through;
    }

    .todo-list li .destroy {
        display: none;
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
    }

    .todo-list li .destroy:hover {
        color: #af5b5e;
    }

    .todo-list li .destroy:after {
        content: '×';
    }

    .todo-list li:hover .destroy {
        display: block;
    }

    .todo-list li .edit {
        display: none;
    }

    .todo-list li.editing:last-child {
        margin-bottom: -1px;
    }

    .edit {
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

    /*
        Hack to remove background from Mobile Safari.
        Can't use it globally since it destroys checkboxes in Firefox
    */
    @media screen and (-webkit-min-device-pixel-ratio:0) {
        .todo-list li .toggle {
            background: none;
        }

        .todo-list li .toggle {
            height: 40px;
        }
    }
</style>