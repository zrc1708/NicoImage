<template>
    <div class="picturescontainer">
        <ul>
            <li v-for="(item) in imagesArr" :key="item.id"><my-imagecard :image="item"></my-imagecard></li>
            <li v-for="(item,index) in imagesArr" :key="index" class="white-list"></li>
        </ul>
    </div>
</template>
<script>
import imagecard from '../components/imagecard/imagecard.vue'

    export default {
        data(){
            return{
                imagesArr:[],
            }
        },
        created(){
            this.getAllImages()
        },
        components:{
            'my-imagecard':imagecard
        },
        methods:{
            async getAllImages(){
                const res = await this.$http.get('/getallimages')
                this.imagesArr = res.data.rs
            }
        }
    }
</script>
<style lang="less" scoped>
.picturescontainer{
    ul{
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        li{
            list-style: none;
        }
        .white-list{
            width: 300px;
            height: 0;
            margin: 10px;
        }
    }
}
</style>