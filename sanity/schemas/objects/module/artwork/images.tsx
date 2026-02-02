import {defineField} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export default defineField({
  name: 'module.artwork.images',
  title: 'Section: Images',
  type: 'object',
  icon: ImagesIcon,
  fields: [
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
      array: 'items',
    },
    prepare({array}) {
      return {
        title: 'Section: Images',
        subtitle: `${Array.isArray(array) ? array.length : 0} items`,
      }
    },
  },
})
