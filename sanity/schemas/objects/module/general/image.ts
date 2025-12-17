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
      name: 'includeMainInLightbox',
      title: 'Include main image in lightbox gallery',
      type: 'boolean',
      initialValue: true,
      hidden: ({parent}) => !parent?.enableLightbox,
    }),

    defineField({
      name: 'lightboxImages',
      title: 'Lightbox images (slider)',
      type: 'array',
      of: [
        defineField({
          name: 'lightboxImage',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'caption', title: 'Caption (optional)', type: 'body.captions'}),
          ],
        }),
      ],
      hidden: ({parent}) => !parent?.enableLightbox,
      description:
        'If empty, lightbox can still open with only the main image (if included).',
    }),
  ],

  preview: {
    select: {
      media: 'image',
      caption: 'caption',
      enableLightbox: 'enableLightbox',
      count: 'lightboxImages.length',
    },
    prepare({media, caption, enableLightbox, count}) {
      return {
        title: 'Image module',
        subtitle: `${caption || '—'}${enableLightbox ? ` · Lightbox (${count || 0})` : ''}`,
        media,
      }
    },
  },
})