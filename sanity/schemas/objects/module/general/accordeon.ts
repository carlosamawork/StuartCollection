import {ChevronDownIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.accordion',
  title: 'Accordion',
  type: 'object',
  icon: ChevronDownIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title (optional)',
      type: 'string',
    }),

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
              title: 'Item content (modules)',
              type: 'array',
              of: [
                {type: 'module.hero'},
                {type: 'module.image'},
                {type: 'module.video'},
                {type: 'module.slider'},
                {type: 'module.separator'},
                {type: 'module.twoColumns'},
                {type: 'module.tileGroup'},
                {type: 'module.mediaList'},
                {type: 'module.jumbotron'},
                {type: 'body.paragraphs'},
                // Igual que tabs: evita incluir module.accordion aquí para no hacer recursión
              ],
              validation: (Rule) => Rule.min(1).error('Add at least 1 module in this item'),
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
          name: 'allowMultiple',
          title: 'Allow multiple open',
          type: 'boolean',
          initialValue: false,
        }),
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
      title: 'title',
      count: 'items.length',
    },
    prepare({title, count}) {
      return {
        title: title || 'Accordion',
        subtitle: `${count || 0} items`,
        media: ChevronDownIcon,
      }
    },
  },
})