<template>
    <div class="main">
        <TodoList />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TodoList from '../components/TodoList.vue'
export default Vue.extend({
    components: {
        TodoList
    }
})
</script>

<style scoped>
    .main {
        position: relative;
        z-index: 2;
        border-top: 1px solid #e6e6e6;
    }
</style>