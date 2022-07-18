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
function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}
async function encode() {
    let plugin = {
        author: "maggch@outlook.com",
        code: b64EncodeUnicode(await getScript()),
        id: 1656139986,
        name: "Video Together",
        url: "*"
    }
    return b64EncodeUnicode(JSON.stringify(plugin));
}

async function getScript() {
    let url = "https://2gether.video/release/extension.user.js?timestamp=" + Date.now();
    let script = "";
    let r = await fetch(url);
    return await r.text();
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
