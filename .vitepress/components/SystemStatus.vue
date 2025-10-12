<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    // Guard: only run in browser
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    function CreateVersionTr(version, percentage) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${version}</td><td>${percentage}</td>`;
        return tr;
    }

    fetch("https://vt.panghair.com:5000/statistics")
        .then(r => r.json())
        .then(data => {
            const syncEl = document.querySelector('#SyncServerStatus');
            if (syncEl) syncEl.style.color = 'green';
            let loaddingVersion = data.loaddingVersion || {};
            let loaddingVersionSum = 0;
            for (let key in loaddingVersion) {
                loaddingVersionSum += loaddingVersion[key];
            }
            const loaddingVersionList = [];
            for (let key in loaddingVersion) {
                loaddingVersionList.push({ version: key, percentage: loaddingVersionSum ? loaddingVersion[key] / loaddingVersionSum * 100 : 0 });
            }
            loaddingVersionList.sort((a, b) => b.percentage - a.percentage);
            const loadingTable = document.querySelector('#LoaddingVersionTable');
            loaddingVersionList.forEach(v => {
                if (loadingTable) loadingTable.appendChild(CreateVersionTr(v.version, v.percentage.toFixed(2) + "%"))
            });

            const version = data.version || {};
            let versionSum = 0;
            for (let key in version) {
                versionSum += version[key];
            }
            const versionList = [];
            for (let key in version) {
                versionList.push({ version: key, percentage: versionSum ? version[key] / versionSum * 100 : 0 });
            }
            versionList.sort((a, b) => b.percentage - a.percentage);
            const versionTable = document.querySelector('#VersionTable');
            versionList.forEach(v => {
                if (versionTable) versionTable.appendChild(CreateVersionTr(v.version, v.percentage.toFixed(2) + "%"))
            });
        })
        .catch(() => {
            const syncEl = document.querySelector('#SyncServerStatus');
            if (syncEl) syncEl.style.color = 'red';
        });

    fetch("https://api.begin0114.wiki/statistics")
        .then(() => { const el = document.querySelector('#ChinaSyncServerStatus'); if (el) el.style.color = 'green' })
        .catch(() => { const el = document.querySelector('#ChinaSyncServerStatus'); if (el) el.style.color = 'red' });
    fetch("https://fastly.jsdelivr.net/gh/VideoTogether/VideoTogether@latest/release/extension.user.js")
        .then(() => { const el = document.querySelector('#JsServerStatus'); if (el) el.style.color = 'green' })
        .catch(() => { const el = document.querySelector('#JsServerStatus'); if (el) el.style.color = 'red' });
    fetch("https://release.begin0114.wiki/release/extension.user.js", { mode: "no-cors" })
        .then(() => { const el = document.querySelector('#ChinaJsServerStatus'); if (el) el.style.color = 'green' })
        .catch(() => { const el = document.querySelector('#ChinaJsServerStatus'); if (el) el.style.color = 'red' });
});
</script>

<template>


    <h2>服务器状态</h2>


    <p>
    <p id="SyncServerStatus" style="color: grey; display: inline;">●</p> 同步服务器</p>
    <p>
    <p id="ChinaSyncServerStatus" style="color: grey; display: inline;">●</p> 同步服务器中国 CDN</p>
    <p>
    <p id="JsServerStatus" style="color: grey; display: inline;">●</p> 插件脚本下载</p>
    <p>
    <p id="ChinaJsServerStatus" style="color: grey; display: inline;">●</p> 插件脚本下载中国 CDN</p>

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
