import {defineField} from 'sanity'
import {VideoIcon, DocumentVideoIcon} from '@sanity/icons'

export default defineField({
  name: 'module.artwork.videos',
  title: 'Section: Videos',
  type: 'object',
  icon: VideoIcon,
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Videos',
    }),
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
      title: 'title',
      array: 'items',
    },
    prepare({title, array}) {
      return {
        title: `Section: ${title || 'Videos'}`,
        subtitle: `${Array.isArray(array) ? array.length : 0} items`,
      }
    },
  },
})
