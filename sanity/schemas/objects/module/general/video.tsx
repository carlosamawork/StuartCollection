import {DocumentVideoIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.video',
  title: 'Video',
  type: 'object',
  icon: DocumentVideoIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      initialValue: 'video',
      options: {
        list: [
          {title: 'Internal Video', value: 'internal-video'},
          {title: 'Youtube/Vimeo Video', value: 'youtube-vimeo-video'},
        ],
      },
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'string',
      initialValue: 'content',
      options: {
        list: [
          {title: 'Full width', value: 'full'},
          {title: 'Content', value: 'content'},
        ],
      },
    }),
    // Internal video
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: ({parent}) => parent?.type !== 'internal-video',
    }),
    defineField({
      name: 'image',
      title: 'Thumbnail',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.type !== 'internal-video',
    }),
    // Image
    defineField({
      name: 'videoUrl',
      title: 'Video url',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'type',
    },
    prepare(selection) {
      const {title} = selection

      return {
        title: title,
      }
    },
  },
})
