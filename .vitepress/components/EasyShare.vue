<script setup>

window.VideoTogetherEasyShareMemberSite = true;
const m3u8Url = decodeURIComponent(window.location.hash.substring(1));

let playerHtml = await(await fetch('/superplayer.html?x=' + Date.now())).text();
let iframe = document.createElement("iframe");
iframe.style.display = 'none'
iframe.src = "data:text/html;base64," + btoa(playerHtml);
document.body.appendChild(iframe);

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
const fetchCallback = {}
const fetchErrCallback = {}
window.addEventListener("message", e => {
    if (e.data.method == "fetchResponse") {
        if (e.data.error == undefined) {
            fetchCallback[e.data.url].forEach(f => {
                try { f(e.data.blob) } catch { };
            })
        } else {
            fetchErrCallback[e.data.url].forEach(f => {
                try { f() } catch { };
            })
        }
    }
})

let normalFetchSuccCount = 0
let loadingUlr = {}
async function superSuperFetch(context) {
    return new Promise(async (res, rej) => {
        try {
            fetch(context.url).then(r => r.blob()).then(blob => {
                res(blob)
                normalFetchSuccCount++;
            }).catch(e => {
                console.log("normal fetch failed");
                if (normalFetchSuccCount > 5) {
                    rej();
                }
            });
        } catch { }
        if (normalFetchSuccCount > 5) {
            return;
        }
        try {
            let start = Date.now() / 1000;
            let realUrl = await videoTogetherExtension.FetchRemoteRealUrl(context.frag.baseurl, context.frag.sn, context.url);
            let end = Date.now() / 1000;
            console.log("FetchRemoteRealUrl time", end - start);
            res(await superFetch(realUrl));
        } catch (e) {
            console.error("super fetch failed", e);
            rej()
        }
    });
}

function loadOrGet(mp, key, defalut) {
    if (mp[key] == undefined) {
        mp[key] = defalut
    }
    return mp[key];
}

async function superFetch(url) {
    return new Promise(async (res, rej) => {
        let id;
        try {
            loadOrGet(fetchCallback, url, []).push(blob => { res(blob); });
            loadOrGet(fetchErrCallback, url, []).push(() => { rej(); })
            iframe.contentWindow.postMessage({
                method: "fetch",
                url: url
            }, '*');
        } catch (e) {
            rej();
        }
    });
}

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

    try {
        if (hlsVideo.readyState >= 3) {
            window.m3u8LoadSucc = true;
            hlsVideo.style.display = "block";
            Array.from(videoTogetherExtension.videoMap.keys()).forEach(k => {
                if (k != hlsVideo.VideoTogetherVideoId) {
                    videoTogetherExtension.videoMap.delete(k);
                }
            });
            nativeVideo.remove();
            setStatusText("");
            return;
        }
    } catch { }
    try {
        if (nativeVideo.readyState >= 3) {
            window.m3u8LoadSucc = true;
            Array.from(videoTogetherExtension.videoMap.keys()).forEach(k => {
                if (k != nativeVideo.VideoTogetherVideoId) {
                    videoTogetherExtension.videoMap.delete(k);
                }
            })
            nativeVideo.style.display = "block";
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
        if (m3u8Url != "" && videoTogetherExtension.roomName != "" && videoTogetherExtension.roomName != "test") {
            if (window.m3u8LoadSucc) {
                fetch(window.videoTogetherExtension.video_together_host + "/beta/counter?key=easyshare_succ")
            } else {
                fetch(window.videoTogetherExtension.video_together_host + "/beta/counter?key=easyshare_err&failedUrl=" + encodeURIComponent(document.querySelector('#originalVideoUrl').href + "#" + navigator.userAgent));
            }
        }
    }, 10000);
}, 500);

function setStatusText(s) {
    document.querySelector('#StatusText').innerText = s;
}

function playM3u8(url) {
    let hlsVideo = document.querySelector("#hlsVideo");
    let nativeVideo = document.querySelector("#nativeVideo");
    try {
        if (Hls.isSupported()) {
            var hls = new Hls({
                pLoader: class CustomLoader extends Hls.DefaultConfig.loader {
                    load(context, config, callbacks) {
                        console.log(context);
                        function limitStream(stream, limit) {
                            const reader = stream.getReader();
                            let bytesRead = 0;

                            return new ReadableStream({
                                async pull(controller) {
                                    const { value, done } = await reader.read();

                                    if (done || bytesRead >= limit) {
                                        controller.close();
                                        return;
                                    }

                                    bytesRead += value.byteLength;
                                    controller.enqueue(value);
                                },

                                cancel(reason) {
                                    reader.cancel(reason);
                                }
                            });
                        }
                        function isM3U8(textContent) {
                            return textContent.trim().startsWith('#EXTM3U');
                        }
                        const abortController = new AbortController();
                        fetch(context.url, { signal: abortController.signal }).then(response => {
                            const limitedStream = limitStream(response.body, 1024); // Limit to 1MB
                            return new Response(limitedStream, { headers: response.headers });
                        }).then(r => r.text())
                            .then(txt => {
                                abortController.abort();
                                if (isM3U8(txt)) {
                                    super.load(context, config, callbacks);
                                } else {
                                    console.error("is not m3u8", txt);
                                }
                            }).catch(e => {
                                super.abort();
                            })
                    }
                },
                fLoader: class CustomFLoader extends Hls.DefaultConfig.loader {
                    async load(context, config, callbacks) {
                        let start = Date.now() / 1000;
                        if (loadingUlr[context.url]) {
                            console.log("duplicate, abort");
                            super.abort();
                            return;
                        }
                        loadingUlr[context.url] = true;
                        if (normalFetchSuccCount < 5) {
                            try {
                                context.url = URL.createObjectURL(await superSuperFetch(context));
                            } catch (e) {
                                console.log("abort");
                            }
                        }
                        let end = Date.now() / 1000;
                        console.log("fetch time", end - start);
                        loadingUlr[context.url] = false;
                        super.load(context, config, callbacks);
                    }
                },
                autoStartLoad: true,
            });
            window.hls = hls;
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