<script setup>

window.VideoTogetherEasyShareMemberSite = true;
const m3u8Url = (window.location.hash.substring(1));
const m3u8ContentCache = {}
const m3u8BlobUrlTom3u8Url = {}
m3u8BlobUrlTom3u8Url[m3u8Url] = m3u8Url;
window.m3u8BlobUrlTom3u8Url = m3u8BlobUrlTom3u8Url;
window.m3u8ContentCache = m3u8ContentCache;
let playerHtml = await(await fetch('/superplayer.html?x=' + Date.now())).text();
let iframe = document.createElement("iframe");
iframe.style.display = 'none'
iframe.src = "data:text/html;base64," + btoa(playerHtml);
document.body.appendChild(iframe);

setInterval(() => {
    videoTogetherExtension.url = window.location.href;
    try {
        if (window.navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1) {
            document.querySelector("#WechatAlert").style.display = "block"
        }
    } catch { }
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
        async function niubiFetch() {
            try {
                let start = Date.now() / 1000;
                let realUrl = await videoTogetherExtension.FetchRemoteRealUrl(m3u8BlobUrlTom3u8Url[context.frag.baseurl], context.frag.sn, context.url);
                let end = Date.now() / 1000;
                console.log("FetchRemoteRealUrl time", end - start);
                res(await superFetch(realUrl));
            } catch (e) {
                console.error("super fetch failed", e);
                rej()
            }
        }

        try {
            try {
                let blob = await (await fetch(context.url)).blob();
                res(blob);
                normalFetchSuccCount++;
            } catch {
                console.log("normal fetch failed");
                if (normalFetchSuccCount > 5) {
                    await niubiFetch();
                }
            }
        } catch { }
        if (normalFetchSuccCount > 5) {
            return;
        }
        await niubiFetch();
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
    if (m3u8Url != (window.location.hash.substring(1))) {
        window.location.reload();
    }
    let hlsVideo = document.querySelector("#hlsVideo");
    let nativeVideo = document.querySelector("#nativeVideo");

    try {
        if (hlsVideo.readyState >= 3) {
            window.m3u8LoadSucc = true;
            hlsVideo.style.display = "block";
            hlsVideo.VideoTogetherDisabled = false;
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
            nativeVideo.VideoTogetherDisabled = false;
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
        if (m3u8Url != ""
            && videoTogetherExtension.roomName != ""
            && videoTogetherExtension.roomName != "test"
            && document.querySelector('#originalVideoUrl').href != window.location.href) {
            if (window.m3u8LoadSucc) {
                fetch(window.videoTogetherExtension.video_together_host + "/beta/counter?key=easyshare_succ")
            } else {
                fetch(window.videoTogetherExtension.video_together_host + "/beta/counter?key=easyshare_err&failedUrl=" + encodeURIComponent(document.querySelector('#originalVideoUrl').href + "#" + navigator.userAgent));
            }
        }
    }, 20000);
}, 500);

function setStatusText(s) {
    document.querySelector('#StatusText').innerText = s;
}

function playM3u8(url) {
    let hlsVideo = document.querySelector("#hlsVideo");
    let nativeVideo = document.querySelector("#nativeVideo");
    hlsVideo.VideoTogetherDisabled = true;
    nativeVideo.VideoTogetherDisabled = true;
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
                        let FetchRemoteM3u8Content = async () => {
                            while (true) {
                                console.log("FetchRemoteM3u8Content");
                                try {
                                    let remoteM3u8Content = await videoTogetherExtension.FetchRemoteM3u8Content(context.url);
                                    m3u8ContentCache[context.url] = remoteM3u8Content;
                                    let m3u8BlobUrl = URL.createObjectURL(new Blob([m3u8ContentCache[context.url]], {
                                        type: 'text/plain'
                                    }));
                                    m3u8BlobUrlTom3u8Url[m3u8BlobUrl] = context.url;
                                    context.url = m3u8BlobUrl;
                                    super.load(context, config, callbacks);
                                    break;
                                } catch (e) {
                                    await new Promise(r => setTimeout(r, 500));
                                }
                            }
                        }
                        const abortController = new AbortController();
                        fetch(context.url, { signal: abortController.signal }).then(response => {
                            const limitedStream = limitStream(response.body, 1024); // Limit to 1MB
                            return new Response(limitedStream, { headers: response.headers });
                        }).then(r => r.text())
                            .then(async txt => {
                                abortController.abort();
                                if (isM3U8(txt)) {
                                    console.log("normal fetch m3u8");
                                    super.load(context, config, callbacks);
                                } else {
                                    FetchRemoteM3u8Content();
                                }
                            }).catch(e => {
                                FetchRemoteM3u8Content();
                            })
                    }
                },
                fLoader: class CustomFLoader extends Hls.DefaultConfig.loader {
                    async load(context, config, callbacks) {
                        console.log(context);
                        if (context.url.startsWith('blob')) {
                            // TODO save the blob url to m3u8 real url
                            context.url = new URL(context.frag.relurl, m3u8BlobUrlTom3u8Url[context.frag.baseurl]);
                        }
                        let start = Date.now() / 1000;
                        if (loadingUlr[context.url]) {
                            console.log("duplicate, abort");
                            super.load(context, config, callbacks);
                            return;
                        }
                        let originalUrl = context.url;
                        loadingUlr[originalUrl] = true;
                        try {
                            context.url = URL.createObjectURL(await superSuperFetch(context));
                        } catch (e) {
                            console.log("abort");
                        }
                        let end = Date.now() / 1000;
                        console.log("fetch time", end - start);
                        loadingUlr[originalUrl] = false;
                        super.load(context, config, callbacks);
                    }
                },
                // debug: true,
                autoStartLoad: true,
                fragLoadingMaxRetry: 1000,
                manifestLoadingMaxRetry: 1000,
                levelLoadingMaxRetry: 1000
            });
            window.hls = hls;
            var m3u8Url = (url);
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

#WechatAlert {
    display: none;
}
</style>