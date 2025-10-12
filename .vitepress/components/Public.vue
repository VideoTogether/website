<template>

    <div id="public" style="width:100%;display: flex;justify-content: center;margin-top:30px">

    </div>

</template>

<script setup>
import { onMounted } from 'vue';
onMounted(() => {
    fetch("https://vt.panghair.com:5000/room/public")
        .then(r => r.json())
        .then(j => {
            const div = document.getElementById("public");
            if (!div) return;
            const table = document.createElement("table");
            const tr = document.createElement("tr");
            const head = ["标题", "房间名", "人数"];
            head.forEach(h => { const th = document.createElement("th"); th.innerHTML = h; tr.appendChild(th); });
            table.appendChild(tr);
            j.forEach(row => {
                const tr = document.createElement("tr");
                [row["videoTitle"], row["name"], row["userCount"]].forEach(val => { const td = document.createElement("td"); td.innerHTML = val; tr.appendChild(td); });
                table.appendChild(tr);
            });
            div.appendChild(table);
        }).catch(() => { });
});
</script>
