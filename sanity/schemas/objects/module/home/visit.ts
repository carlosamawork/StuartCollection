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
      description: 'Ej: horarios, cierre, notas cortas',
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
          options: {list: [{title: 'Video', value: 'video'}, {title: 'Image', value: 'image'}]},
        }),

        defineField({
          name: 'video',
          title: 'Video',
          type: 'module.video',
          options: {hotspot: true},
          hidden: ({parent}) => parent?.type !== 'video',
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

    defineField({
      name: 'options',
      title: 'Options',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({name: 'invert', title: 'Invert columns', type: 'boolean', initialValue: false}),
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