import {PinIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'module.visit',
  title: 'Visit',
  type: 'object',
  icon: PinIcon,
  fields: [
    // Columna izquierda
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Visit',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'meta',
      title: 'Meta (small text)',
      description: 'e.g. schedules, closures, short notes',
      type: 'body.paragraphs',
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'ctaButton',
    }),

    // Columna derecha
    defineField({
      name: 'body',
      title: 'Body',
      type: 'body.paragraphs',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'media',
      title: 'Media',
      type: 'object',
      fields: [
        defineField({
          name: 'type',
          title: 'Type',
          type: 'string',
          initialValue: 'video',
          options: {list: [{title: 'Internal Video', value: 'internal-video'}, {title: 'Youtube/Vimeo Video', value: 'youtube-vimeo-video'}, {title: 'Image', value: 'image'}]},
        }),

        defineField({
          name: 'video',
          title: 'Video',
          type: 'module.video',
          options: {hotspot: true},
          hidden: ({parent}) => parent?.type !== 'internal-video',
        }),
        defineField({
          name: 'externalVideoUrl',
          title: 'External Video URL (Youtube/Vimeo)',
          type: 'string',
          hidden: ({parent}) => parent?.type !== 'youtube-vimeo-video',
        }),

        // Alternativa: imagen
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
          hidden: ({parent}) => parent?.type !== 'image',
        }),

        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
    }),
  ],

  preview: {
    select: {title: 'title', caption: 'media.caption'},
    prepare({title, caption}) {
      return {
        title: title || 'Visit',
        subtitle: caption ? `Media: ${caption}` : 'Visit module',
        media: PinIcon,
      }
    },
  },
})