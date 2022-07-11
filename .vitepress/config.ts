import { defineConfig } from "vitepress"
const defaultSidebar = [
  // {
  //   text: "快速开始",
  //   link: "/guide/getting-started",
  // },
  {
    text: "安装说明",
    link: "/guide/install",
  },
  {
    text: "使用指南",
    link: "/guide/introduction",
  },
  {
    text:"常见问题",
    link: "/guide/qa"
  },
  {
    text: "本地播放",
    link: "/guide/local",
  },
]
const nav = [
  ...defaultSidebar,
]
export default defineConfig({
  title: "VideoTogether",
  description: "和你的家人朋友一起在线看视频，无论相隔多远",
  lastUpdated: true,
  themeConfig: {
    nav,
    socialLinks: [
      { icon: "github", link: "https://github.com/VideoTogether/VideoTogether.github.io" },
    ],
    footer: {
      message: '欢迎加入我们的交流群。QQ群： 170200260 ，Telegram：https://t.me/videotogether_group',
      copyright: "Copyright © 2022-present VideoTogether",
    },
    lastUpdatedText: "Last Updated"
  },
})
