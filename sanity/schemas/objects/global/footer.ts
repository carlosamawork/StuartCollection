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
    defineField({
      name: 'claim',
      title: 'Claim',
      type: 'string',
    }),
    // Links
    defineField({
      name: 'linksPolicy',
      title: 'Links',
      type: 'array',
      of: [{type: 'linkExternal'},],
    }),
    defineField({
      name: 'titleNewsletter',
      title: 'Title Newsletter',
      type: 'string',
    }),
    defineField({
      name: 'descriptionNewsletter',
      title: 'Description Newsletter',
      type: 'text',
    }),
    defineField({
      name: 'linksSocial',
      title: 'Links Social',
      type: 'array',
      of: [{type: 'linkSocial'}],
    }),
  ],
})
