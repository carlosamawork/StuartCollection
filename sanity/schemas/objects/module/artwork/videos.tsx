import {defineField} from 'sanity'
import {VideoIcon, DocumentVideoIcon} from '@sanity/icons'

export default defineField({
  name: 'module.artwork.videos',
  title: 'Section: Videos',
  type: 'object',
  icon: VideoIcon,
  fields: [
    // Description
    defineField({
      name: 'description',
      title: 'Description (above)',
      type: 'string',
    }),
    // Videos
    defineField({
      name: 'items',
      title: 'Videos',
      type: 'array',
      description: 'Copy/paste the Youtube or Vimeo video URLs you want to embed.',
      of: [
        {
          name: 'item',
          title: 'Video Embed (from URL)',
          type: 'url',
          icon: DocumentVideoIcon,
        },
      ],
      validation: (Rule) => Rule.min(1).error('Add at least 1 item'),
    }),
  ],
  preview: {
    select: {
      array: 'items',
    },
    prepare({array}) {
      return {
        title: 'Section: Videos',
        subtitle: `${Array.isArray(array) ? array.length : 0} items`,
      }
    },
  },
})
