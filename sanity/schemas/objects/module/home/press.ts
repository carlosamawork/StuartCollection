import {DocumentsIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'module.press',
  title: 'Press',
  type: 'object',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Press',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'cta',
      title: 'CTA (View all)',
      type: 'object',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string', initialValue: 'View All'}),
        defineField({
          name: 'href',
          title: 'Link',
          type: 'url',
          validation: (Rule) => Rule.uri({allowRelative: true, scheme: ['http', 'https']}),
        }),
        defineField({name: 'blank', title: 'Open in new tab', type: 'boolean', initialValue: false}),
      ],
    }),

    defineField({
      name: 'items',
      title: 'Articles',
      type: 'array',
      validation: (Rule) => Rule.min(1).max(12),
      of: [
        defineField({
          name: 'article',
          title: 'Article',
          type: 'reference',
          to: [{type: 'pressArticle'}],
        }),
      ],
    }),

    defineField({
      name: 'options',
      title: 'Options',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({name: 'columnsDesktop', title: 'Columns (desktop)', type: 'number', initialValue: 3}),
      ],
    }),
  ],

  preview: {
    select: {count: 'items.length'},
    prepare({count}) {
      return {title: 'Press', subtitle: `${count || 0} articles`, media: DocumentsIcon}
    },
  },
})