<template>
    <div class="todo-count">
        <strong>{{ stillIncomplete }}</strong> item<span v-if="stillIncomplete !== 1">s</span> left
    </div>
</template>

<script lang="ts">
import { ITodoItem } from '@/utils/utils'
import Vue from 'vue'
import { mapState } from 'vuex'
export default Vue.extend({
    computed: {
        ...mapState(['todosList']),
        stillIncomplete(): number {
            return (this.todosList.filter((item: ITodoItem) => !item.isCompleted)).length
        }
    },
})
</script>

<style scoped>
    .todo-count {
        float: left;
        text-align: left;
    }

    .todo-count strong {
        font-weight: 300;
    }
</style>