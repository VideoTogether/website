<script setup>

const helpClick = ()=>{
    if(document.querySelector("#helpItem").checked){
        window.location = "/guide/qa.html";
    }else{
        alert("请先勾选确认事项")
    }
}

(function test(){
    setTimeout(()=>{
        try{ 
            document.documentElement.querySelector('.VPNav').style.display='none';
            document.documentElement.querySelector('.VPFooter').style.display='none';
        }catch{}
    },100)
})();
</script>


<template>

<div>
<br/>
<br/>
<p>请勾选确认事项后点击查看帮助</p>

<label> <input id="helpItem" type="checkbox" />我需要一起看功能相关的帮助</label>

<br/>
<button @click="helpClick">查看帮助</button>
</div>

</template>
