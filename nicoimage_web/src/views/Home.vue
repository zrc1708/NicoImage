<template>
    <div class="container">
        <header>
            <div></div>
            <my-bar :items="['上传','图库','接口']" @clickbar="clickbar" class="bar"></my-bar>
            <div class="leave">
                <span>欢迎，{{username}}</span><span @click="logout">退出登录</span>
            </div>
        </header>
        <router-view></router-view>
    </div>
</template>
<script>
import Bar from '../components/bar/bar.vue'

export default {
    data() {
        return {
            username:''
        }
    },
    components:{
        'my-bar':Bar
    },
    created(){
        this.username = this.$cookie.get('username')
    },
    methods: {
        // 点击导航，切换路由
        clickbar(item){
            const bar ={
                '上传':'/upload',
                '图库':'/pictures',
                '接口':'/api'
            }
            if(this.$router.history.current.path == bar[item]){
                return
            }
            this.$router.push(bar[item])     
        },
        //退出登录 
        logout(){
            window.sessionStorage.clear()
            this.$cookie.remove('token')
            this.$cookie.remove('username')
            this.$router.push('/login') 
        }
    },
}
</script>

<style lang="less" scoped>
header{
    display: flex;
    border-bottom: 1px solid rgba(0,0,0,.1);
    height: 60px;
    align-items: center;
    justify-content: center;

    div{
        flex: 1;
    }
    .bar{
        flex: 1;
    }
    .leave{
        text-align: right;
        span{
            padding-right: 20px;
        }
        span:nth-child(2){
            cursor: pointer;
            text-decoration: underline;
        }
    }
}
</style>