import {ImagesIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'module.people',
  title: 'People',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'listOfPeople',
      title: 'List of People',
      type: 'array',
      validation: (Rule) => Rule.min(1).error('Add at least 1 person'),
      of: [
        defineField({
          name: 'person',
          title: 'Person',
          type: 'reference',
          to: [{type: 'person'}],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      count: 'listOfPeople.length',
    },
    prepare({count}) {
      return {
        title: 'People',
        subtitle: `${count || 0} people`,
        media: ImagesIcon,
      }
    },
  },
})