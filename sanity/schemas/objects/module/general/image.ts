import {ImageIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.image',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
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
      description: 'Short caption under the image',
    }),

    defineField({
      name: 'enableLightbox',
      title: 'Enable lightbox',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'width',
      title: 'Image width',
      type: 'string',
      initialValue: 'full',
      options: {
        list: [
          {title: 'Full width', value: 'full'},
          {title: 'Content', value: 'content'},
        ],
      },
    }),
  ],

  preview: {
    select: {
      media: 'image',
      caption: 'caption',
      enableLightbox: 'enableLightbox',
    },
    prepare({media, caption, enableLightbox}) {
      return {
        title: 'Image module',
        subtitle: `${caption || '—'}${enableLightbox ? ` · Lightbox` : ''}`,
        media,
      }
    },
  },
})