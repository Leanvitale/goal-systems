<template>
    <ul class="filters">
        <li>
            <router-link to="/all" custom v-slot="{ navigate, href }">
                <a :href="href" @click="navigate" :class="{'selected': (route === '/all' || route === '/')}" data-test="all">All</a>
            </router-link>
        </li>
        <li>
            <router-link to="/active" custom v-slot="{ navigate, href }">
                <a :href="href" @click="navigate" :class="{'selected': route === '/active'}" data-test="active">Active</a>
            </router-link>
        </li>
        <li>
            <router-link to="/completed" custom v-slot="{ navigate, href }">
                <a :href="href" @click="navigate" :class="{'selected': route === '/completed'}" data-test="completed">Completed</a>
            </router-link>
        </li>
    </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
export default Vue.extend({
    computed: {
        ...mapState(['todosList', 'route']),
    },
    methods: {
        ...mapActions(['UPDATE_ROUTE']),
    },
    watch: {
        $route() {
            this.UPDATE_ROUTE()
        },
    },
})
</script>

<style scoped>
    .filters {
        margin: 0;
        padding: 0;
        list-style: none;
        position: absolute;
        right: 0;
        left: 0;
    }

    .filters li {
        display: inline;
    }

    .filters li a {
        color: inherit;
        margin: 3px;
        padding: 3px 7px;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 3px;
    }

    .filters li a:hover {
        border-color: rgba(175, 47, 47, 0.1);
    }

    .filters li a.selected {
        border-color: rgba(175, 47, 47, 0.2);
    }

    @media (max-width: 430px) {
        .filters {
            bottom: 10px;
        }
    }
</style>