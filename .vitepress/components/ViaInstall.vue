<script setup lang="ts">
const install = async () => {
  let isShark = false;
  try {
    if (window.webkit.messageHandlers.jsExtensionContent.postMessage != undefined) {
      isShark = true;
    }
  } catch { }
  if (typeof (window.via) != "undefined" && typeof (window.via.addon) != "undefined") {
    try {
      window.via.addon(await encode());
    } catch (e) {
      alert("安装失败" + e);
    }
  } else if (isShark) {
    try {
      let sharkDic = {
        'type': 'via',
        'source': await encode()
      };
      console.info(sharkDic);
      window.webkit.messageHandlers.jsExtensionContent.postMessage(sharkDic);
    } catch (e) {
      alert("安装失败" + e);
    }

  } else {
    alert("不是 Via， Alook 或鲨鱼浏览器");
  }
}
</script>
<template>
  <button class="btn" @click="install">安装 VideoTogether</button>
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
