<template>
    <div class="p-relative">
        <input type="checkbox" name="toggle-all" class="toggle-all" :checked="allCompleted" v-if="haveItems" >
        <label for="toggle-all" @click="selectAll"></label>
    </div>
</template>

<script lang="ts">
import { ITodoItem } from '@/utils/utils'
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
export default Vue.extend({
    computed: {
        ...mapState(['todosList', 'isEditing']),
        haveItems(): boolean {
            return !!this.todosList && this.todosList.length > 0
        },
        allCompleted(): boolean {
            return this.todosList.every((v: ITodoItem) => {
                return v.isCompleted
            })
        }
    },
    methods: {
        ...mapActions(['CHANGE_ALL_ITEM_STATUS']),
        selectAll() {
            if ( this.isEditing ) return
            this.CHANGE_ALL_ITEM_STATUS(!this.allCompleted);
        }
    },
})
</script>

<style scoped>
    .p-relative {
        position: relative;
    }

    .toggle-all {
        text-align: center;
        border: none; /* Mobile Safari */
        opacity: 0;
        position: absolute;
    }

    .toggle-all + label {
        width: 60px;
        height: 34px;
        font-size: 0;
        position: absolute;
        top: -52px;
        left: -13px;
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    .toggle-all + label:before {
        content: '❯';
        font-size: 22px;
        color: #e6e6e6;
        padding: 10px 27px 10px 27px;
    }

    .toggle-all:checked + label:before {
        color: #737373;
    }

    /*
        Hack to remove background from Mobile Safari.
        Can't use it globally since it destroys checkboxes in Firefox
    */
    @media screen and (-webkit-min-device-pixel-ratio:0) {
        .toggle-all {
            background: none;
        }
    }
</style>