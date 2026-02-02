import {defineField} from 'sanity'
import {MarkerIcon} from '@sanity/icons'

export default defineField({
  name: 'module.artwork.visit',
  title: 'Section: Visit',
  icon: MarkerIcon,
  type: 'object',
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Visit',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: `Section: ${title || 'Visit'}`,
      }
    },
  },
})
