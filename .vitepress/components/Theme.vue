<script setup>
const fileChange = (e)=>{
    console.log(e.target.files[0]);
    let file = e.target.files[0];
    let body = document.querySelector("#VideoTogetherWrapper").shadowRoot.querySelector('.vt-modal-body');
    body.style.backgroundImage = `url("${URL.createObjectURL(file)}")` 
}
</script>
<template>
    <h3>赞助商顶级至尊黄金功能: 专属房间背景功能</h3>
    <br/><br/>
    <label for="imageInput">输入爱发电订单号：</label>
    <input type="text" id="orderInput" style="border:solid" /> 
    <br/><br/>
    <label for="imageInput">输入房间名：</label>
    <input type="text" id="orderInput" style="border:solid" /> 
    <br/><br/>
    <label for="imageInput">选择背景图片：</label>
    <input type="file" accept="image/*" id="imageInput" @change="fileChange"/>
    <br/><br/>
    <p>订单号可以在这个页面找到：<a href="https://afdian.net/dashboard/order">https://afdian.net/dashboard/order</a></p>
    <br/>
    <p>选择图片后，你可以在右下角的 VideoTogether 中预览效果</p>
</template>