import {defineField} from 'sanity'
import {UserIcon} from '@sanity/icons'

export default defineField({
  name: 'module.artwork.artist',
  title: 'Section: The Artist(s)',
  type: 'object',
  icon: UserIcon,
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'The Artist',
    }),
    // Body
    defineField({
      name: 'text',
      title: 'Text',
      type: 'body.paragraphs',
    }),
    // Image
    defineField({
      name: 'artists',
      title: 'Artists',
      type: 'array',
      of: [
        {
          name: 'artist',
          title: 'Artist',
          type: 'reference',
          to: [{type: 'artist'}],
        },
      ],
      validation: (Rule) => Rule.min(1).error('Add at least 1 artist'),
    }),
    // Accordion
    defineField({
      name: 'accordeon',
      title: 'Accordeon',
      type: 'module.artwork.textAccordeon',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: `Section: ${title || 'The Artist(s)'}`,
      }
    },
  },
})
