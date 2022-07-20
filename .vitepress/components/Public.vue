<template>

<div id="public" style="width:100%;display: flex;justify-content: center;margin-top:30px">
 
</div>

</template>

<script setup>
(function(){
    fetch("https://vt.panghair.com:5000/room/public",  )
        .then(r=>r.json())
        .then(j=>{
            let div = document.getElementById("public");
            let table = document.createElement("table");
            let tr = document.createElement("tr");
            let head = ["标题","房间名","人数"]
            for(let i =0;i<head.length;i++){
                var th = document.createElement("th");
                th.innerHTML = head[i];
                tr.appendChild(th)
            }
            table.appendChild(tr);
            for(let i=0;i<j.length;i++){
                let tr  = document.createElement("tr");
                let title  = document.createElement("td");
                title.innerHTML  = j[i]["videoTitle"];
                                let name  = document.createElement("td");
                name.innerHTML  = j[i]["name"];
                let userCount  = document.createElement("td");
                userCount.innerHTML  = j[i]["userCount"];
                tr.appendChild(title);
                tr.appendChild(name);
                tr.appendChild(userCount);
                table.appendChild(tr);
            }
            
            div.appendChild(table);
            document.querySelector("#test").innerHTML = j
        })
})();
</script>


