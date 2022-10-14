<script>
(await function(){
    if(navigator.language.toLowerCase().startsWith('zh')){
        window.location = '/zh-cn/'
    }else{
         window.location = '/en-us/'
    }
})()
</script>