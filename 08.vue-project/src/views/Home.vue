<template>
    <div class="banner">
        <el-carousel :interval="4000" type="card" height="400px">
            <el-carousel-item v-for="item in sliders" :key="item.sId">
                <img :src="item.url" style="width: 100%; height: 100%">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import * as types from '@/store/action-types'

export default {
    mounted() {
        if (this.sliders.length === 0) {
            this[types.SET_SLIDERS]()
        }
    },
    computed: {
        ...mapState(['sliders'])
    },
    methods: {
        ...mapActions([types.SET_SLIDERS])
    }
}


</script>

<style scoped>

</style>