<script setup lang="ts">
window.VideoTogetherExtensionUrl = "https://2gether.video/release/extension.user.js"
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
    alert("开始鲨鱼浏览器安装")
    try {
      let sharkDic = {
        'type': 'via',
        'source': await encode()
      };
      console.info(sharkDic);
      window.webkit.messageHandlers.jsExtensionContent.postMessage(sharkDic);
      alert("安装结束")
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
    try{
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
          function toSolidBytes(match, p1) {
              return String.fromCharCode('0x' + p1);
      }));
    }catch{
      alert("加密失败")
    }

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
    let url = window.VideoTogetherExtensionUrl;
    let script = "";
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)
    try{
      alert("插件地址："+url)
      let r = await fetch(url, { signal: controller.signal });
      let text =  await r.text();
      alert("获取插件数据成功，开始安装")
      return text;
    }catch(e){
      alert("获取插件数据失败")
    }
}

(function test(){
      const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)
  fetch("https://2gether.video/release/extension.user.js", { signal: controller.signal })
  .then(r=>{console.log(r)})
  .catch(e=>{
    let hrefs = document.getElementsByTagName("a");

    for (let i = 0; i <hrefs.length ; i++) {
      if(hrefs[i].href == window.VideoTogetherExtensionUrl){
       hrefs[i].href = "https://videotogether.oss-cn-hangzhou.aliyuncs.com/release/extension.user.js"
      }
    }
    window.VideoTogetherExtensionUrl = "https://videotogether.oss-cn-hangzhou.aliyuncs.com/release/extension.user.js"
    console.error(e);

  })

})();

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
