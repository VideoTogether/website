<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const videoUrl = ref('')

function getFile(e)  {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file)
  videoUrl.value = url
}

window.videoTogetherWebsiteSettingUrl = "/v2_website.html";

let script = document.createElement('script');
script.src ='/release/extension.website.user.js';
document.head.appendChild(script);

</script>
<template>
  <div style="margin: 20px;">
    <input style="" type="file" ref="file" @change="getFile($event)" />
  </div>

  <div>
    <video :src="videoUrl" style="width: 720px; height: 480px;" controls autoplay loop playsinline></video>
  </div>
</template>
<style scoped>
.btn {
  border: 1px solid #e6e6e6;
  padding: 5px 10px;
  border-radius: 5px;
}
.btn:hover {
  background-color: #efefef;
}
</style>
