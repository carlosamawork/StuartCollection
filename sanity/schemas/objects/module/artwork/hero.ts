import {defineField} from 'sanity'

export default defineField({
  name: 'module.artwork.hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      video: 'videoUrl',
    },
    prepare(selection) {
      const {media, video} = selection
      return {
        title: 'General Hero',
        media: media,
        subtitle: media || video ? '1 Media Item' : 'Empy',
      }
    },
  },
})
