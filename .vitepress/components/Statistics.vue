<template>

<div style="width:100%;display: flex;justify-content: center;margin-top:30px">
 <p style="display: inline;">有 <p id="RoomCount" style="display: inline;">...</p> 个视频房间活跃中<p id="serverStatus" style="color:grey;display: inline;">●</p></p>
</div>

</template>

<script setup>
(function(){
    const controller = new AbortController()

    // 5 second timeout:
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    fetch("https://vt.panghair.com:5000/statistics",  { signal: controller.signal })
        .then(r=>r.json())
        .then(j=>{
            document.querySelector("#RoomCount").innerHTML = j["roomCount"];
            document.querySelector("#serverStatus").style.color="green";
        }).catch(error=>{
            document.querySelector("#serverStatus").style.color="red";
            document.querySelector("#serverStatus").innerHTML = "●" + error;
        })
})();
</script>


