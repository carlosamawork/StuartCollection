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
      count: 'listOfPeople',
    },
    prepare({count}) {
      const peopleCount = count?.length || 0
      return {
        title: 'People',
        subtitle: `${peopleCount} people`,
        media: ImagesIcon,
      }
    },
  },
})