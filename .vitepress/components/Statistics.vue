<template>

<div style="width:100%;display: flex;justify-content: center;margin-top:30px">
 <p style="display: inline;">有 <p id="RoomCount" style="display: inline;">9</p> 个视频房间活跃中</p>
</div>

</template>

<script setup>
(function(){
    fetch("https://vt.panghair.com:5000/statistics")
        .then(r=>r.json())
        .then(j=>{
            document.querySelector("#RoomCount").innerHTML = j["roomCount"];
            console.log(j);
        })
})();
</script>


