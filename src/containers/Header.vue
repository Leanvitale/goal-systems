<template>
    <div>
        <Title />
        <InputNewItem />
        <ToggleAll />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Title from '../components/Title.vue'
import InputNewItem from '../components/InputNewItem.vue'
import ToggleAll from '../components/ToggleAll.vue'

export default Vue.extend({
    components: {
        Title,
        InputNewItem,
        ToggleAll
    }
})
</script>