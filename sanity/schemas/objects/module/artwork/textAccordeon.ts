import {ChevronDownIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.artwork.textAccordeon',
  title: 'Accordion',
  type: 'object',
  icon: ChevronDownIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      validation: (Rule) => Rule.min(1).error('Add at least 1 item'),
      of: [
        defineField({
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Item label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Item content',
              type: 'body.paragraphs',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              count: 'content.length',
            },
            prepare({title, count}) {
              return {
                title: title || 'Item',
                subtitle: `${count || 0} modules`,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'options',
      title: 'Options',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({
          name: 'openFirst',
          title: 'Open first by default',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({items}) {
      const count = Array.isArray(items) ? items.length : 0
      return {
        title: 'Accordion',
        subtitle: `${count} items`,
        media: ChevronDownIcon,
      }
    },
  },
})
