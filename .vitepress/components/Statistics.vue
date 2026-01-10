<template>

<div style="width:100%;display:flex;justify-content:center;margin-top:30px">
  <p style="display:inline;">
    有 <span id="RoomCount" style="display:inline;">{{ roomCount }}</span> 个视频房间活跃中
    <span id="serverStatus" :style="{ color: statusColor, display: 'inline' }">{{ statusText }}</span>
  </p>
</div>

</template>

<script setup>
import { onMounted, ref } from 'vue';

const roomCount = ref('...');
const statusColor = ref('grey');
const statusText = ref('●');

onMounted(()=>{
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 5000);

    fetch("https://vt.panghair.com:5000/statistics", { signal: controller.signal })
        .then((r) => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        })
        .then((j) => {
            roomCount.value = String(j?.roomCount ?? '0');
            statusColor.value = 'green';
        })
        .catch((error) => {
            statusColor.value = 'red';
            // Keep a simple dot; avoid dumping raw error text into the page.
            statusText.value = '●';
            // Optional: uncomment to surface debug info
            // console.warn('Statistics fetch failed:', error);
        });
});
</script>


