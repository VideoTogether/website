
<script setup>
        function CreateVersionTr(version, percentage){
            let tr = document.createElement('tr');
            tr.innerHTML = `<td>${version}</td><td>${percentage}</td>`;
            return tr;
        }
    fetch("https://vt.panghair.com:5000/statistics")
        .then(r=>r.json())
        .then(data=>{
            document.querySelector('#SyncServerStatus').style.color='green';
            console.log(data);
            let loaddingVersion = data.loaddingVersion;
            let loaddingVersionSum = 0;
            for(let key in loaddingVersion){
                loaddingVersionSum += loaddingVersion[key];
            }
            let loaddingVersionList = [];
            for(let key in loaddingVersion){
                loaddingVersionList.push({version:key, percentage:loaddingVersion[key]/loaddingVersionSum*100});
                console.log(key, loaddingVersion[key]/loaddingVersionSum*100);
                // document.querySelector('#LoaddingVersionTable').appendChild(CreateVersionTr(key,(loaddingVersion[key]/loaddingVersionSum*100).toFixed(2)+"%"))
            }
            loaddingVersionList.sort((a,b)=>b.percentage-a.percentage);
            console.log(loaddingVersionList);
            loaddingVersionList.forEach(v=>{
                document.querySelector('#LoaddingVersionTable').appendChild(CreateVersionTr(v.version, v.percentage.toFixed(2)+"%"))
            });
            
            let version = data.version;
            let versionSum = 0;
            for(let key in version){
                versionSum += version[key];
            }
            let versionList = [];
            for(let key in version){
                versionList.push({version:key, percentage:version[key]/versionSum*100});
            }
            versionList.sort((a,b)=>b.percentage-a.percentage);
            console.log(versionList);
            versionList.forEach(v=>{
                document.querySelector('#VersionTable').appendChild(CreateVersionTr(v.version, v.percentage.toFixed(2)+"%"))
            });
        })
        .catch(()=>{
            document.querySelector('#SyncServerStatus').style.color='red';
        })
    fetch("https://api.chizhou.in/statistics")
        .then(()=>{document.querySelector('#ChinaSyncServerStatus').style.color='green'})
        .catch(()=>{document.querySelector('#ChinaSyncServerStatus').style.color='red'})
    fetch("https://2gether.video/release/extension.user.js")
        .then(()=>{document.querySelector('#JsServerStatus').style.color='green'})
        .catch(()=>{document.querySelector('#JsServerStatus').style.color='red'})
    fetch("https://videotogether.oss-cn-hangzhou.aliyuncs.com/release/extension.user.js",{mode:"no-cors"})
        .then(()=>{document.querySelector('#ChinaJsServerStatus').style.color='green'})
        .catch(()=>{document.querySelector('#ChinaJsServerStatus').style.color='red'})

</script>

<template>


<h2>服务器状态</h2>


<p><p id="SyncServerStatus" style="color: grey; display: inline;">●</p> 同步服务器</p>
<p><p id="ChinaSyncServerStatus" style="color: grey; display: inline;">●</p> 同步服务器中国 CDN</p>
<p><p id="JsServerStatus" style="color: grey; display: inline;">●</p> 插件脚本下载</p>
<p><p id="ChinaJsServerStatus" style="color: grey; display: inline;">●</p> 插件脚本下载中国 CDN</p>

<h2>版本统计</h2>
<h3>插件版本</h3>
<table id="LoaddingVersionTable">
<tr>
    <th>版本</th>
    <th>占比</th>
</tr>
</table>
<h3>子版本</h3>
<table id="VersionTable">
<tr>
    <th>版本</th>
    <th>占比</th>
</tr>
</table>
</template>
