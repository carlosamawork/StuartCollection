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
      name: 'columns',
      title: 'Columns (grid)',
      type: 'number',
      initialValue: 2,
      hidden: ({parent}) => parent?.layout !== 'grid',
      validation: (Rule) => Rule.min(1).max(4),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      validation: (Rule) => Rule.min(1).error('Add at least 1 item'),
      of: [
        {type: 'module.video'},
        {type: 'module.image'},
      ],
    }),

    
  ],

  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({title, items}) {
      const count = items?.length;
      return {
        title: title || 'Media list',
        subtitle: `${count || 0} items`,
        media: PlayIcon,
      }
    },
  },
})