# 为网页版 VideoTogether 添加设置功能

1. 将 https://setting.2gether.video/v2_website.html 这个 html 文件部署到你的网站，路径随意
2. 将集成 VideoTogether 的代码从

    `<script src="https://2gether.video/release/extension.website.user.js"></script>`

    修改为，其中链接修改成第一步中部署的html文件的链接：

```
<script>
window.videoTogetherWebsiteSettingUrl = "填入第一步中部署的html文件的链接";
</script>
<script src="https://2gether.video/release/extension.website.user.js"></script>
```



这个设置页面很简陋，如果你有兴趣来做一个更好的界面，欢迎合并到 Github 仓库

有问题请加群反馈