<script setup>

window.VideoTogetherEasyShareMemberSite = true;
let m3u8Url = window.location.hash.substring(1);

let script = document.createElement('script');

script.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
document.head.appendChild(script);

let extensionScript = document.createElement('script');
extensionScript.src = '/release/extension.website.user.js';
document.head.appendChild(extensionScript);

window.m3u8Played = false;
window.m3u8LoadSucc = false;
setInterval(() => {
    if (window.querySelector('.easyShareVideo') == null) {
        window.VideoTogetherEasyShareMemberSite = false;
    }
    if (m3u8Url != window.location.hash.substring(1)) {
        window.location.reload();
    }
    let hlsVideo = document.querySelector("#hlsVideo");
    let nativeVideo = document.querySelector("#nativeVideo");
    try {
        if (hlsVideo.readyState >= 3) {
            window.m3u8LoadSucc = true;
            hlsVideo.style.display = "block";
            nativeVideo.remove();
            setStatusText("");
            return;
        }
    } catch { }
    try {
        if (nativeVideo.readyState >= 3) {
            window.m3u8LoadSucc = true;
            nativeVideo.style.display = "block";
            hlsVideo.remove();
            setStatusText("");
            return;
        }
    } catch { }

    if (window.Hls == undefined) {
        return;
    }
    if (window.m3u8Played) {
        return;
    }

    window.m3u8Played = true;
    playM3u8(m3u8Url);

    setTimeout(() => {
        if (!window.m3u8LoadSucc) {
            setStatusText("视频加载过久, 该视频可能不支持轻松分享。建议安装插件进行同步")
        }
    }, 10000);
}, 1000);

function setStatusText(s) {
    document.querySelector('#StatusText').innerText = s;
}

function playM3u8(url) {
    console.log("123");
    let hlsVideo = document.querySelector("#hlsVideo");
    let nativeVideo = document.querySelector("#nativeVideo");
    try {
        if (Hls.isSupported()) {
            var hls = new Hls();
            var m3u8Url = decodeURIComponent(url)
            hls.loadSource(m3u8Url);
            hls.attachMedia(hlsVideo);
            hlsVideo.load();
        }
    } catch { }
    try {
        nativeVideo.src = url;
        nativeVideo.load();
    } catch { }

}

</script>

<style >
.easyShareVideo {
    max-width: 100%;
    display: none;
}
</style>