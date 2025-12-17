import {PlayIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.mediaList',
  title: 'Media list (images + videos)',
  type: 'object',
  icon: PlayIcon,
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
        {type: 'module.image'},
        {type: 'module.video'},
      ],
    }),

    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'grid',
      options: {
        layout: 'radio',
        list: [
          {title: 'Grid', value: 'grid'},
          {title: 'Stack (vertical)', value: 'stack'},
        ],
      },
    }),

    defineField({
      name: 'columns',
      title: 'Columns (grid)',
      type: 'number',
      initialValue: 2,
      hidden: ({parent}) => parent?.layout !== 'grid',
      validation: (Rule) => Rule.min(1).max(6),
    }),

    defineField({
      name: 'gap',
      title: 'Gap',
      type: 'string',
      initialValue: 'md',
      options: {
        layout: 'radio',
        list: [
          {title: 'S', value: 'sm'},
          {title: 'M', value: 'md'},
          {title: 'L', value: 'lg'},
        ],
      },
    }),
  ],

  preview: {
    select: {
      title: 'title',
      count: 'items.length',
    },
    prepare({title, count}) {
      return {
        title: title || 'Media list',
        subtitle: `${count || 0} items`,
        media: PlayIcon,
      }
    },
  },
})