<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const videoUrl = ref('')

function getFile(e)  {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file)
  videoUrl.value = url
}

</script>
<template>
  <div style="margin: 20px;">
    <input style="" type="file" ref="file" @change="getFile($event)" />
    <!-- <button class="btn" @click="">选择本地视频</button> -->
  </div>

  <div>
    <video :src="videoUrl" style="width: 720px; height: 480px;" controls autoplay loop playsinline>你的浏览器不能支持HTML5视频</video>
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
