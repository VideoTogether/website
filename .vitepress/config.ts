import { defineConfig } from "vitepress"
const defaultSidebar = [
  // {
  //   text: "快速开始",
  //   link: "/guide/getting-started",
  // },
  {
    text: "安装说明",
    link: "/zh-cn/guide/install",
  },
  {
    text: "使用指南",
    link: "/zh-cn/guide/introduction",
  },
  {
    text: "添加到网站",
    link: "/zh-cn/guide/website"
  },
  {
    text: "常见问题",
    link: "/zh-cn/guide/qa",
  }
]

const nav = [
  ...defaultSidebar,
]

const navEn = [
  {
    text: "Installation",
    link: "/en-us/guide/install",
  },
  {
    text: "Guide",
    link: "/en-us/guide/introduction",
  },
  {
    text: "Add to your website",
    link: "/en-us/guide/website"
  },
  {
    text: "Q&A",
    link: "/en-us/guide/qa",
  }
]
export default defineConfig({
  head: [
    [
      'meta',
      { name: "referrer", content: "no-referrer" }
    ]
  ],
  locales: {
    '/zh-cn/': {
      lang: 'zh-CN',
      title: 'VideoTogether',
      description: '和你的家人朋友一起在线看视频，无论相隔多远',
      selectText: '选择语言',
    },
    '/en-us/': {
      lang: 'en-US',
      title: 'VideoTogether',
      description: 'Watch videos online with your family and friends, no matter the distance between you',
      selectText: 'Languages',
    },
    '/': {
      lang: 'en-US',
      title: 'VideoTogether',
      description: 'Watch videos online with your family and friends, no matter the distance between you',
      selectText: 'Languages',
    }
  },
  base: '/',
  lastUpdated: true,
  themeConfig: {
    localeLinks: {
      items: [
        { text: '简体中文', link: '/zh-cn/'},
        { text: 'English', link: '/en-us/'}
      ]
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/VideoTogether/VideoTogether" },
    ],
    locales: {
      '/zh-cn/': {
        nav: nav,
        lastUpdatedText: "上次更新",
        footer: {
          message: '欢迎加入我们的交流群。QQ群： 204015847 ，Telegram：https://t.me/videotogether_group',
          copyright: "Copyright © 2022-present VideoTogether",
        }
      },
      '/en-us/': {
        nav: navEn,
        lastUpdatedText: "Last Updated",
        footer: {
          message: 'Give feedback: https://github.com/VideoTogether/VideoTogether/issues',
          copyright: "Copyright © 2022-present VideoTogether",
        },
      },
      '/': {
        nav: navEn,
        lastUpdatedText: "Last Updated",
        footer: {
          message: 'Give feedback: https://github.com/VideoTogether/VideoTogether/issues',
          copyright: "Copyright © 2022-present VideoTogether",
        },
      }
    }
  },
})
