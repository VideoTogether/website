<script setup>

window.VideoTogetherEasyShareMemberSite = true;
const m3u8Url = decodeURIComponent(window.location.hash.substring(1));

let playerHtml = await(await fetch('/superplayer.html?x=' + Date.now())).text();
// this can be hack, but I think the hack can do nothing in this page
// SEO AD?
playerHtml = playerHtml.replace('M3U8_URL', m3u8Url.replace(/'/g, ""));
playerHtml = playerHtml.replace('EXTENSION_JS', new URL('/release/extension.website.user.js', window.location).href)
console.log(btoa(playerHtml));
let iframe = document.createElement("iframe");
// iframe.style.display = 'none'
iframe.src = "data:text/html;base64," + btoa(playerHtml);
iframe.width = "100%";
iframe.height = "300px";
document.querySelector('#hlsFrame').appendChild(iframe);

setInterval(() => {
    videoTogetherExtension.url = window.location.href;
}, 1000)
window.addEventListener("popstate", e => {
    videoTogetherExtension.url = window.location.href;
})

let script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/hls.js@1.2.1";
document.head.appendChild(script);
script = document.createElement('script');
script.src = "https://cdn.bootcdn.net/ajax/libs/hls.js/1.2.1/hls.js";
document.head.appendChild(script);


let extensionScript = document.createElement('script');
extensionScript.src = '/release/extension.website.user.js';
document.head.appendChild(extensionScript);

window.m3u8Played = false;
window.m3u8LoadSucc = false;
setInterval(() => {
    function emptyStrIfUdf(s) {
        return s == undefined ? "" : s;
    }

    document.querySelector('#originalVideoUrl').innerText = emptyStrIfUdf(window.VideoTogetherEasyShareTitle);
    document.querySelector('#originalVideoUrl').href = emptyStrIfUdf(window.VideoTogetherEasyShareUrl);


    if (document.querySelector('.easyShareVideo') == null) {
        window.VideoTogetherEasyShareMemberSite = false;
    }
    if (m3u8Url != decodeURIComponent(window.location.hash.substring(1))) {
        window.location.reload();
    }
    let hlsVideo = document.querySelector("#hlsVideo");
    let nativeVideo = document.querySelector("#nativeVideo");
    window.addEventListener("message", e => {
        if (e.data == 'hlsVideoReady') {
            window.m3u8LoadSucc = true;
            try {
                videoTogetherExtension.videoMap.delete(hlsVideo.VideoTogetherVideoId);
                hlsVideo.remove();
            } catch { };
            try {
                videoTogetherExtension.videoMap.delete(nativeVideo.VideoTogetherVideoId);
                nativeVideo.remove();
            } catch { }
            document.querySelector('#hlsFrame').style.display = "block";
            setStatusText("");
        }
    })
    try {
        if (hlsVideo.readyState >= 3) {
            window.m3u8LoadSucc = true;
            hlsVideo.style.display = "block";
            Array.from(videoTogetherExtension.videoMap.keys()).forEach(k => {
                if (k != hlsVideo.VideoTogetherVideoId) {
                    videoTogetherExtension.videoMap.delete(k);
                }
            })
            nativeVideo.remove();
            iframe.remove();
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
    // only run once
    window.m3u8Played = true;
    playM3u8(m3u8Url);

    setTimeout(() => {
        if (!window.m3u8LoadSucc) {
            setStatusText(document.querySelector('#LoadTimeoutText').innerText);
        }
        if (m3u8Url != "") {
            if (window.m3u8LoadSucc) {
                fetch(window.videoTogetherExtension.video_together_host + "/beta/counter?key=easyshare_succ")
            } else {
                fetch(window.videoTogetherExtension.video_together_host + "/beta/counter?key=easyshare_err")
            }
        }
    }, 10000);
}, 1000);

function setStatusText(s) {
    document.querySelector('#StatusText').innerText = s;
}

function playM3u8(url) {
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