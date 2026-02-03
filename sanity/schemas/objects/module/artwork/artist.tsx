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
    // Images
    defineField({
      name: 'images',
      title: 'Images',
      type: 'object',
      fields: [
        defineField({
          name: 'customizeArtistsImages',
          title: 'Customize artist images?',
          description: `Otherwise portraits of artists will populate automatically from "Editorial>Artist(s)" field.`,
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'images',
          title: 'Artists images',
          description: 'Select custom images or artists to show their images',
          type: 'array',
          of: [
            {
              name: 'artist',
              title: 'Artist',
              type: 'reference',
              to: [{type: 'artist'}],
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            },
          ],
          hidden: ({parent}) => parent?.customizeArtistsImages !== true,
        }),
      ],
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
