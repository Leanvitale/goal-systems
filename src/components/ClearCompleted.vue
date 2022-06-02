<template>
    <button class="clear-completed" v-if="someCompleted" @click="clearCompleted()">
        Clear completed
    </button>
</template>

<script lang="ts">
import { ITodoItem } from '@/utils/utils'
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
export default Vue.extend({
    computed: {
        ...mapState(['todosList', 'route']),
        someCompleted(): boolean {
            if ( this.route === '/active' ) return false

            return this.todosList.some((v: ITodoItem) => {
                return v.isCompleted
            })
        }
    },
    methods: {
        ...mapActions(['CLEAR_COMPLETED']),
        clearCompleted() {
            this.CLEAR_COMPLETED()
        }
    }
})
</script>

<style scoped>
    .clear-completed,
    html .clear-completed:active {
        float: right;
        position: relative;
        line-height: 20px;
        text-decoration: none;
        cursor: pointer;
    }

    .clear-completed:hover {
        text-decoration: underline;
    }
</style>