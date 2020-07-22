<template>
    <div class="imagecardcontainer">
        <img :src="image.url" alt="">
        <ul>
            <li><div class="button watch"></div></li>
            <li><div class="button url"></div></li>
            <li><div class="button delete"></div></li>
        </ul>
        <div class="name">
            <p>{{image.filename}}</p>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['image'],
        data(){
            return{
                
            }
        },
        computed:{
            
        },
        methods:{
            
        }
    }
</script>
<style lang="less" scoped>
.imagecardcontainer{
    display: inline-block;
    margin: 10px;
    position: relative;
    width: 300px;
    height: 300px;
    background-color: rgba(0, 0, 0, 0.08);
    overflow: hidden;

    &:hover ul{
        transform: translateX(0);
    }

    img{
        width:100%;
        height:100%;
        object-fit: contain;
    }
    
    ul{
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
        padding: 0;
        transition: all .35s ease-in-out;
        transform: translateX(100%);

        li{
            list-style: none;
            background-color: rgba(0, 0, 0, 0.6);
            margin-bottom: 5px;
            padding: 6px;

            .button{
                width: 30px;
                height: 30px;
                cursor: pointer;
            }
            .url{
                background: url(./nico.png) no-repeat;
                background-size: cover;
                background-position: 50% 0;
                vertical-align: middle;
            }
            .watch{
                background: url(./nico.png) no-repeat;
                background-size: cover;
                vertical-align: middle;
            }
            .delete{
                background: url(./nico.png) no-repeat;
                background-size: cover;
                background-position: 100% 0;
                vertical-align: middle;
            }
        }
    }

    .name{
        position: absolute;
        bottom: 0;
        height: 30%;
        width: 100%;
        background: linear-gradient(to bottom,rgba(0,0,0,0) 0%,rgba(0,0,0,0.55) 100%);
        overflow: hidden;
        p{
            position: absolute;
            font-size: 20px;
            color: white;
            font-size: 20px;
            display: block;
            width: 100%;
            box-sizing: border-box;
            bottom: 0;
            padding: 0 15px;
            word-wrap: break-word;
            word-break: break-all;
            overflow: hidden;
        }
    }
}
</style>