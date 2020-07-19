<template>
    <div class="container">
        <my-message :type='messageType' :text='messageText' v-if="messageShow"></my-message>
        <input type="file" ref="file" @change="checkField($event)" accept="image/*" multiple="multiple" v-show="false"/> 
        <div class="upload" ref="uploadbox">
            <div class="uploadboxOperation">
                <ul>
                    <li v-for="(item,index) in imgarr" :key="index">
                        <img :src="item" alt="">
                    </li>
                </ul>
                <span class="uploadboxText">
                    拖动图片至此或
                    <span class="choose" @click="upload">选择文件</span>
                    <span v-if="imgarr.length!=0" @click="clear" class="clear">清除选择</span>
                </span>
            </div>
            <div class="uploadButton" @click="uploadImage" v-if="imgarr.length!=0">上传</div>
        </div>
    </div>
</template>
<script>
import Message from '../components/message/message.vue'

    export default {
        data(){
            return{
                imgarr:[],
                filesArr:[],
                messageShow:false
            }
        },
        mounted(){
            const uploadbox = this.$refs.uploadbox
            uploadbox.addEventListener("dragenter", this.dragenter, false);
            uploadbox.addEventListener("dragover", this.dragover, false);
            uploadbox.addEventListener("drop", this.drop, false);
        },
        methods:{
            upload(){
                this.$refs.file.click()
            },       
            //获取所选文件的信息并进行上传
            checkField(e){
                let arr = e.target.value.split('\\')
                let name = arr[arr.length-1]

                const upload = document.querySelector('.upload')

                window.URL = window.URL || window.webkitURL;

                this.message('success','选择图片成功')

                this.$refs.file.files.forEach(item => {
                    this.imgarr.push(window.URL.createObjectURL(item))
                    this.filesArr.push(item)
                });
            },
            async uploadImage(){//调用上传文件接口
                // console.log(this.filesArr)
                const formData = new FormData()
                const files = this.filesArr
                files.forEach(item=>{
                    formData.append("file",item)
                })
                console.log(formData.getAll('file'));
                await this.$http.post("uploadimage",formData)
            },

            // 清除选择
            clear(){
                this.message('success','已清除选择')
                this.imgarr = []
            },

            message(type,text){
                this.messageShow = false
                this.messageType = type
                this.messageText = text
                setTimeout(() => {
                    this.messageShow = true
                }, 50);
            },

            // 禁止事件传播和阻止默认事件
            dragenter(e) {
                e.stopPropagation();
                e.preventDefault();
            },
            dragover(e) {
                e.stopPropagation();
                e.preventDefault();
            } ,
            // 拖拽上传
            drop(e) {
                e.stopPropagation();
                e.preventDefault();
                let files = e.dataTransfer.files;
                // 数量判断
                if(this.imgarr.length+files.length>8){
                    return this.message('error','最多一次上传8张图片')
                }
                // 内容判断
                let flag = 0
                files.forEach(item => {
                    if(item.type.split('/')[0]!=='image'){
                        flag=1
                    }
                });
                if(flag){
                    return this.message('error','请选择图片文件')
                }

                this.message('success','选择图片成功')
                files.forEach(item => {
                    this.imgarr.push(window.URL.createObjectURL(item))
                    this.filesArr.push(item)
                });
            }
        },
        components:{
            'my-message':Message
        },
    }
</script>
<style lang="less" scoped>
.upload{
    position: relative;
    border: 3px #8b8b8b dashed;
    box-sizing: border-box;
    width: 98%;
    height: 500px;
    border-radius: 10px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;

    .choose{
        text-decoration: underline;
        color: blue;
        cursor: pointer;
        &:active{
            color: blueviolet;
        }
    }
    .clear{
        text-decoration: underline;
        color: blue;
        margin-left: 10px;
        cursor: pointer;
        &:active{
            color: blueviolet;
        }
    }
    .uploadButton{
        box-sizing: border-box;
        position: absolute;
        bottom: 10px;
        right: 10px;
        border: 1px solid #8b8b8b;
        border-radius: 10px;
        width: 90px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        cursor: pointer;
        transition: all .25s;
        &:hover{
            background-color: #38b7ea;
            color: white;
        }
    }
}

.uploadboxOperation{
    display: flex;
    flex-direction: column;

    .uploadboxText{
        text-align: center;
    }
}

ul{
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    li{
        list-style: none;
        margin: 10px;
        border: 1px solid lightblue;
        img{
            height: 180px;
            vertical-align: bottom;
        }
    }
}
</style>