import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarEn: SidebarConfig = {
  '/alertrules/': [
    {
      text: 'Alert Rules',
      children: [
        '/alertrules/README.md',
        '/alertrules/PrometheusSelfRules.md',
        '/alertrules/NodeExporterRules.md'
      ],
    },
  ]
}