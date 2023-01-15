import { defineUserConfig } from 'vuepress'
import { defaultTheme } from 'vuepress'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { searchPlugin } from '@vuepress/plugin-search'

const isProd = process.env.NODE_ENV === 'production'

import {
    head,
    navbarEn,
    navbarZh,
    sidebarEn,
    sidebarZh,
} from './configs/index.js'

export default defineUserConfig({
    // set site base to default value
    base: '/',
  
    // extra tags in `<head>`
    head,
  
    // site-level locales config
    locales: {
      '/': {
        lang: 'en-US',
        title: 'noAlert',
        description: 'No alert, Not only alert!',
      },
      '/zh/': {
        lang: 'zh-CN',
        title: 'noAlert',
        description: 'No alert, Not only alert!',
      },
    },
  
    // specify bundler via environment variable
    //bundler:
    //  process.env.DOCS_BUNDLER === 'webpack' ? webpackBundler() : viteBundler(),
  
    // configure default theme
    theme: defaultTheme({
      logo: '/images/icon.svg',
      repo: 'guaguafrog/noalert',
      docsDir: 'docs',
  
      // theme-level locales config
      locales: {
        /**
         * English locale config
         *
         * As the default locale of @vuepress/theme-default is English,
         * we don't need to set all of the locale fields
         */
        '/': {
          // navbar
          navbar: navbarEn,
          // sidebar
          sidebar: sidebarEn,
          // page meta
          editLinkText: 'Edit this page on GitHub',
        },
  
        /**
         * Chinese locale config
         */
        '/zh/': {
          // navbar
          navbar: navbarZh,
          selectLanguageName: '简体中文',
          selectLanguageText: '选择语言',
          selectLanguageAriaLabel: '选择语言',
          // sidebar
          sidebar: sidebarZh,
          // page meta
          editLinkText: '在 GitHub 上编辑此页',
          //lastUpdatedText: '上次更新',
          //contributorsText: '贡献者',
          // custom containers
          tip: '提示',
          warning: '注意',
          danger: '警告',
          // 404 page
          notFound: [
            '这里什么都没有',
            '我们怎么到这来了？',
            '这是一个 404 页面',
            '看起来我们进入了错误的链接',
          ],
          backToHome: '返回首页',
          // a11y
          openInNewWindow: '在新窗口打开',
          toggleColorMode: '切换颜色模式',
          toggleSidebar: '切换侧边栏',
        },
      },
  
      themePlugins: {
        // only enable git plugin in production mode
        git: isProd,
        // use shiki plugin in production mode instead
        prismjs: !isProd,
      },
    }),
    plugins: [
        searchPlugin({
          locales: {
            '/': {
              placeholder: 'Search',
            },
            '/zh/': {
              placeholder: '搜索',
            },
          },
        }),
      ],
})