<template>
    <div class="footer" v-if="isNotEmpty">
        <Counter />
        <Filters />
        <ClearCompleted />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import ClearCompleted from '../components/ClearCompleted.vue'
import Counter from '../components/Counter.vue'
import Filters from '../components/Filters.vue'
export default Vue.extend({
    components: {
        ClearCompleted,
        Counter,
        Filters
    },
    computed: {
        ...mapState(['todosList']),
        isNotEmpty() {
        return this.todosList.length > 0
        }
    },
})
</script>

<style scoped>
    .footer {
        color: #777;
        padding: 10px 15px;
        height: 20px;
        text-align: center;
        border-top: 1px solid #e6e6e6;
    }

    .footer:before {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 50px;
        overflow: hidden;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
                    0 8px 0 -3px #f6f6f6,
                    0 9px 1px -3px rgba(0, 0, 0, 0.2),
                    0 16px 0 -6px #f6f6f6,
                    0 17px 2px -6px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 430px) {
        .footer {
            height: 50px;
        }
    }

</style>