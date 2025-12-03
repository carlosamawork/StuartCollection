import {defineField} from 'sanity'

export default defineField({
  name: 'footerSettings',
  title: 'Footer',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    // Links
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{type: 'linkInternal'}, {type: 'linkExternal'}],
    }),
    defineField({
      name: 'linksSocial',
      title: 'Links Social',
      type: 'array',
      of: [{type: 'linkSocial'}],
    }),
  ],
})
