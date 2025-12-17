import {ImagesIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.slider',
  title: 'Slider',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      validation: (Rule) => Rule.min(1).error('Add at least 1 slide'),
      of: [
        defineField({
          name: 'slide',
          title: 'Slide',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'body.captions',
            }),

            defineField({
              name: 'link',
              title: 'Link (optional)',
              type: 'url',
            }),
          ],
          preview: {
            select: {media: 'image', caption: 'caption'},
            prepare({media, caption}) {
              return {
                title: caption || 'Slide',
                media,
              }
            },
          },
        }),
      ],
    }),

    // Opciones del slider
    defineField({
      name: 'options',
      title: 'Options',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({ name: 'loop', title: 'Loop', type: 'boolean', initialValue: true }),
        defineField({ name: 'autoplay', title: 'Autoplay', type: 'boolean', initialValue: false }),
        defineField({
          name: 'autoplayDelay',
          title: 'Autoplay delay (ms)',
          type: 'number',
          initialValue: 3500,
          hidden: ({parent}) => !parent?.autoplay,
          validation: (Rule) => Rule.min(1000).max(20000),
        }),
        defineField({ name: 'showArrows', title: 'Show arrows', type: 'boolean', initialValue: true }),
        defineField({ name: 'showDots', title: 'Show dots', type: 'boolean', initialValue: true }),
      ],
    }),
  ],

  preview: {
    select: {count: 'slides.length'},
    prepare({count}) {
      return {
        title: 'Slider',
        subtitle: `${count || 0} slides`,
        media: ImagesIcon,
      }
    },
  },
})