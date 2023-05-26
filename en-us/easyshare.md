# Easy Share (Beta version, please give feedback in github or store if you have any problem)

**Origianl video link：**<a id="originalVideoUrl"></a>

Loading failures, synchronization issues, and buffering in the video may be due to browser compatibility. We recommend installing the VideoTogether extension for a better experience

<h1 id="StatusText" style="color:#FF5555">Loadding video...</h1>
<p style="display:none;" id="LoadTimeoutText">The video is taking too long to load; it might cannot be easy shared. We recommend installing VideoTogether extension to sync.</p>

<video class="easyShareVideo" id="hlsVideo" controls autoplay playsinline></video>
<video class="easyShareVideo" id="nativeVideo" controls autoplay playsinline></video>

<script setup>
import EasyShare from '../.vitepress/components/EasyShare.vue'
</script>
<EasyShare />





<!-- **如果该功能侵犯了您的任何权益：点击此处反馈并查看如何在您的网站上禁用该功能** -->
**If this feature infringes on any of your rights, please report it on https://github.com/VideoTogether/VideoTogether/issues. In the meantime, you can use the following code to temporarily disable easy share on your website.**
```
window.VideoTogetherEasyShare = 'disabled'
```