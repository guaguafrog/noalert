import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
  '/zh/alertrules/': [
    {
      text: '告警规则',
      children: [
        '/zh/alertrules/README.md',
        '/zh/alertrules/PrometheusSelfRules.md'
      ],
    },
  ]
}