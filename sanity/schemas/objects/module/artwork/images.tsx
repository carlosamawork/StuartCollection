import {defineField} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export default defineField({
  name: 'module.artwork.images',
  title: 'Section: Images',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Images',
    }),
    // Images
    defineField({
      name: 'items',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
      validation: (Rule) => Rule.min(1).error('Add at least 1 item'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      array: 'items',
    },
    prepare({title, array}) {
      return {
        title: `Section: ${title || 'Images'}`,
        subtitle: `${Array.isArray(array) ? array.length : 0} items`,
      }
    },
  },
})
