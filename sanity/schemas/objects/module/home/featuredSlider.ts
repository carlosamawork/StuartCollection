// /sanity/schemas/modules/module.featuredSlider.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'module.featuredSlider',
  title: 'Featured Slider',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow (opcional)',
      type: 'string',
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      validation: (Rule) => Rule.min(1).error('Añade al menos 1 slide'),
      of: [
        {
          name: 'featuredSlide',
          title: 'Featured Slide',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Imagen',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtítulo',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Descripción',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'object',
              fields: [
                defineField({
                  name: 'href',
                  title: 'URL',
                  type: 'string',
                }),
                defineField({
                  name: 'blank',
                  title: 'Abrir en nueva pestaña',
                  type: 'boolean',
                  initialValue: false,
                }),
              ],
            }),
          ],
          preview: {
            select: {title: 'title', media: 'image'},
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'eyebrow', slides: 'slides'},
    prepare({title, slides}) {
      const count = slides?.length || 0
      return {
        title: title || 'Featured Slider',
        subtitle: `${count} slide${count === 1 ? '' : 's'}`,
      }
    },
  },
})